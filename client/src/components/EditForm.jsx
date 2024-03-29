import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditForm = (props) => {
  const [imgFile, setImgFile] = useState(null);
  const [telefonos, setTelefonos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (props.userInfo && props.userInfo.nombres && props.userInfo.apellidos) {
      document.getElementById("names").value = props.userInfo.nombres;
      document.getElementById("lastnames").value = props.userInfo.apellidos;
    }
    if (props.userInfo && props.userInfo.telefonos) {
      setTelefonos(props.userInfo.telefonos);
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
      nombres: document.getElementById("names").value,
      apellidos: document.getElementById("lastnames").value,
      imagen: imgResult.data.file.id,
      telefonos,
    };
    axios
      .put("http://localhost:5000/user/" + props.userInfo._id, bodyFinal, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        Swal.fire(
          "¡Satisfactorio!",
          "Usuario actualizado exitósamente.",
          "success"
        );
        props.dismissModal();
      })
      .finally(() => props.setLoading(false));
  };

  const add = (e) => {
    if (e.key === "Enter") {
      const phonesCopy = [...telefonos];
      phonesCopy.push(document.getElementById("phones").value);
      setTelefonos(phonesCopy);
      isUpdate(false);
      document.getElementById("phones").value = "";
    }
  };

  const update = (e) => {
    if (e.key === "Enter") {
      const phonesCopy = [...telefonos];
      phonesCopy[index] = document.getElementById("phones").value;
      setTelefonos(phonesCopy);
      isUpdate(false);
      document.getElementById("phones").value = "";
    }
  };

  const Delete = (indexLocal) => {
    const phonesCopy = [...telefonos];
    phonesCopy.splice(indexLocal, 1);
    setTelefonos(phonesCopy);
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
                type="number"
                placeholder="Teléfonos"
                className="input-text"
                onKeyDown={(e) => (isUpdate ? update(e) : add(e))}
              />
            </div>
          </div>
          <div className="row">
            <ul>
              {telefonos.map((e, i) => (
                <li key={i}>
                  <div className="card">
                    <div
                      className="card-body"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <strong>{e}</strong>
                      </p>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setIsUpdate(true);
                            document.getElementById("phones").value = e;
                            setIndex(i);
                          }}
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => Delete(i)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
