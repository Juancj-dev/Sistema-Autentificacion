const inpUser = document.getElementById("inp-user");
const inpMail = document.getElementById("inp-mail");
const inpPass = document.getElementById("inp-pass");

const msjUser = document.getElementById("msj-user");
const msjMail = document.getElementById("msj-mail");
const msjPass = document.getElementById("msj-pass");

const btnRegister = document.getElementById("btn-register");

function mostrarMensaje(text, type, camp) {
    [msjUser ,msjMail, msjPass].forEach(el => el.textContent = "");

    const color = type === "success" ? "#21ae22" : "#f00";

    const objetivos = {
        msjUser: [msjUser],
        msjEmail: [msjMail],
        msjPass: [msjPass],
        losTres: [ msjUser,msjMail, msjPass]
    };

    objetivos[camp]?.forEach(elemento => {
        elemento.textContent = text;
        elemento.style.color = color;
    });
}

function validarCampos(user, email, pass) {
    const userLimpio = email.trim();
    const emailLimpio = email.trim().toLowerCase();
    const passLimpio = pass.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userLimpio || !emailLimpio || !passLimpio) {
        throw { message: "Todos los campos son obligatorios", camp: "losTres" };
    }

    if (!emailRegex.test(emailLimpio)) {
        throw { message: "Email inválido", camp: "msjEmail" };
    }

    return {
        email: emailLimpio,
        pass: passLimpio
    };
}

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();

    try {
        const datosValidos = validarCampos(inpUser.value, inpMail.value, inpPass.value);

        if (datosValidos) {
            mostrarMensaje("Válido", "success", "losTres");
            console.log("Datos listos para enviar:", datosValidos);
        }
    } catch (error) {
        mostrarMensaje(error.message, "error", error.camp);
    }
});