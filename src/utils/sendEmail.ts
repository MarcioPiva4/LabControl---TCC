import nodemailer from 'nodemailer';

export function sendEmail(senha: string, email: string, name: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "labcontrolgerenciador@gmail.com", 
      pass: "rfeqbdjxzupleeid", 
    },
  });

  const mailOptions = {
    from: "labcontrolgerenciador@gmail.com",
    to: email,
    subject: "LABCONTROL - CADASTRO",
    html: `<p>Olá ${name},você foi cadastrado na labcontrol como um administrador, para o primeiro acesso digite a seguinte senha: <b>${senha}</b>, após isto crie uma nova senha.</p>`,
    text: `Olá ${name},você foi cadastrado na labcontrol como um administrador, para o primeiro acesso digite a seguinte senha: ${senha}, após isto crie uma nova senha.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail:", error);
    } else {
      console.log("E-mail enviado:", info.response);
    }
  });
}
