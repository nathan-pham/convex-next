import Document, { Html, Head, Main, NextScript } from 'next/document'

import Script from "../js/client/script"

class _Document extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {
            ...initialProps
        }
    }
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <Script>
                        {
                            () => {
                                if (location.hostname !== "localhost" && location.protocol !== "https:") {
                                    location.href = location.href.replace("http://", "https://")
                                }

                                const createField = () => {
                                    let div = document.createElement('div')
                                    div.id = 'alert-field'
                                    document.body.appendChild(div)
                                }

                                createField()
                                
                                window.createAlert = (message, className) => {
                                    let a = document.createElement('div')
                                    a.className = 'alert'
                                    if(className) {
                                        a.classList.add(className)
                                    }
                                    a.innerHTML = 
                                    `
                                    <span class="close">&times;</span>
                                    ${message}
                                    `
                                    document.getElementById('alert-field').appendChild(a)
                                    
                                    const deleteAlert = () => {
                                        a.style.opacity = 0
                                        a.ontransitionend = () => {
                                            a.remove()
                                        }
                                    }
                                
                                    let time = setTimeout(deleteAlert, 3000)
                                    a.onmouseover = () => {
                                        clearTimeout(time)
                                    }
                                    a.onmouseleave = () => {
                                        time = setTimeout(deleteAlert, 3000)
                                    }
                                    a.querySelector('span').onclick = () => {
                                        clearTimeout(time)
                                        deleteAlert()
                                    }
                                
                                    return false
                                }
                            }
                        }
                    </Script>
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default _Document
