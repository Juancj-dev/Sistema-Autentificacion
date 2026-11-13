const inpMail = document.getElementById("inp-mail");
const inpPass = document.getElementById("inp-pass");

const msjMail = document.getElementById("msj-mail");
const msjPass = document.getElementById("msj-pass");

const btnLogin = document.getElementById("btn-login");

function mostrarMensaje(text, type, camp) {
    [msjMail, msjPass].forEach(el => el.textContent = "");

    const color = type === "success" ? "#21ae22" : "#f00";


    const objetivos = {
        msjEmail: [msjMail],
        msjPass: [msjPass],
        ambos: [msjMail, msjPass]
    };

    objetivos[camp]?.forEach(elemento => {
        elemento.textContent = text;
        elemento.style.color = color;
    });
}

function validarCampos(email, pass) {
    const emailLimpio = email.trim().toLowerCase();
    const passLimpio = pass.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailLimpio || !passLimpio) {
        throw { message: "Todos los campos son obligatorios", camp: "ambos" };
    }

    if (!emailRegex.test(emailLimpio)) {
        throw { message: "Email inválido", camp: "msjEmail" };
    }

    return {
        email: emailLimpio,
        pass: passLimpio
    };
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    try {
        const datosValidos = validarCampos(inpMail.value, inpPass.value);

        if (datosValidos) {
            mostrarMensaje("Válido", "success", "ambos");
            console.log("Datos listos para enviar:", datosValidos);
        }
    } catch (error) {
        mostrarMensaje(error.message, "error", error.camp);
    }
});