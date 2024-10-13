import nodemailer from 'nodemailer';

export function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "marciopivajunior457@gmail.com",
      pass: "kikokiko987",
    },
  });

  const mailOptions = {
    from: "teste",
    to: "marciogamesjoao@gmail.com",
    subject: "Teste",
    text: "Senha: 1111",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail:", error);
    } else {
      console.log("E-mail enviado:", info.response);
    }
  });
}
