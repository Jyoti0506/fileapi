const forgot_pass_template = (email,token,url) => {
    return  `<html>
                <head>
                        <style>
                            * {
                                box-sizing: border-box;
                            }
                            body {
                                margin: 0;
                                height: 50vh;
                                width:100%;
                                height: 100vh;
                                

                            }
                            .title h1 {
                                    text-align: center;
                                    color: slateblue;
                            }
                            .content {
                                text-align: center;
                        
                            }

                            .content .btn {
                                padding: 12px 14px;
                                width : 5vw;
                                background-color:orangered;
                                color: #fff;
                                font-weight: bold;
                                font-size: 1.2rem;
                                border: none;
                                border-radius: 10px;
                                text-decoration: none;
                                cursor: pointer;
                            }

                            @media screen and (max-width: 768px) {
                                .container {
                                    width: 100%;
                                    height: 100vh;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 10px;
                                }
                            }
                        </style>
                </head>
                <body>
                        <div="container">
                            <div="title">
                                    <h1>Password Reset</h1>
                            </div>
                        </div>
                        <div="content">
                                <p>Seems like you forgot your passwod for ${url}. If this is true, click below link to reset your password.</p>
                                <a href="${url}/email/${email}/token/${token}" class= "btn"> Reset My password </a>
                        </div>
                        <div class="note">
                                    <p> If you did not forgot your password you can safely ignore this email. </p>
                        </div>
                </body>
            </html>`
}

module.exports = forgot_pass_template