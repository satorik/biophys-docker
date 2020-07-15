import nodemailer from 'nodemailer'

export default async (username, email, hashedString, mailType) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ACC,
      pass: process.env.GMAIL_PASS
    }
  })

  let mailHtml = ''
  let subject = ''

  if (mailType === 'register') {
    subject = 'Подтверждение регистрации'
    mailHtml = `Здравствуйте, ${username}!
    <br>
    <br>
    Для подтверждения регистрации, перейдите по ссылке:<br>
    ${process.env.WEB_ADR}/account/activation/${hashedString}
    <br>
    <br>
    После подтверждения, ждите, пока вашу учетную запись одобрит один из модераторов.
    <br>
    <br>
    --
    ByophysSite
     `
  }
  else if (mailType === 'recovery') {
    subject = 'Восстановление пароля'
    mailHtml = `Здравствуйте, ${username}!
    <br>
    <br>
    Для восстановления пароля, пройдите по ссылке:<br>
    ${process.env.WEB_ADR}/account/recovery/${hashedString}
    <br>
    <br>
    Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.
    <br>
    <br>
    --
    ByophysSite
     `
  }


  try {
     await transporter.sendMail({
      from: process.env.GMAIL_ACC,
      to: email,
      subject,
      html: mailHtml 
    })

    return true
  } catch (error) {
    console.log('sendMail', error)
  }
}

