import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [adding, setAdding] = useState(false);
  const [colorToAdd, setcolorToAdd] = useState(false);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`,colorToEdit)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    
    updateColors(colors.map(color => {
      if(color.id === colorToEdit.id){
        return colorToEdit 
      } 
      return color
    }))
    setEditing(false);
  };

  const deleteColor = colorToDelete => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${colorToDelete.id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    updateColors(colors.filter(color => color.id != colorToDelete.id))
    setEditing(false)
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      {!adding &&(
        <div className="button-row">
          <button onClick={() => {setAdding(true)}}>add color</button>
        </div>
      )}
      {adding &&(
      
      <form onSubmit={null}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
