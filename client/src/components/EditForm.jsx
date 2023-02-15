import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditForm = (props) => {
  
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    if(props.userInfo && props.userInfo.nombres && props.userInfo.apellidos) {
        document.getElementById("names").value = props.userInfo.nombres;
        document.getElementById("lastnames").value = props.userInfo.apellidos;
    }
  }, [props.userInfo]);

  const openFileManager = () => {
    document.getElementById("file-input").click();
  };

  const changeListener = async (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      props.setImgDefault(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const updateUser = async (e) => {
    e.preventDefault();
    props.setLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.append("file", imgFile);
    const imgResult = await axios({
      method: "post",
      url: "http://localhost:5000/upload",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const bodyFinal = {
        "nombres": document.getElementById('names').value,
        "apellidos": document.getElementById('lastnames').value,
        "imagen": imgResult.data.file.id,
    }
    axios.put('http://localhost:5000/user/' + props.userInfo._id, bodyFinal, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(() => {
        Swal.fire('¡Satisfactorio!', 'Usuario actualizado exitósamente.', 'success');
        props.dismissModal();
    }).finally(() => props.setLoading(false));
  };

  return (
    <React.Fragment>
      <form onSubmit={(e) => updateUser(e)}>
        <div className="modal-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <img src={props.imgDefault} className="default-user-img" />
              <br />
              <button
                onClick={() => openFileManager()}
                id="file"
                type="button"
                className="btn btn-sm btn-primary"
                style={{ fontSize: "10px" }}
              >
                Cambiar
              </button>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h5>Correo: {props.userInfo ? props.userInfo.correo : ""}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                id="names"
                type="text"
                placeholder="Nombres"
                className="input-text"
              />
            </div>
            <div className="col-md-6">
              <input
                id="lastnames"
                type="text"
                placeholder="Apellidos"
                className="input-text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <input
                id="phones"
                type="text"
                placeholder="Teléfonos"
                className="input-text"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Actualizar
          </button>
        </div>
      </form>
      <input
        id="file-input"
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={(e) => changeListener(e)}
      />
    </React.Fragment>
  );
};

export default EditForm;
