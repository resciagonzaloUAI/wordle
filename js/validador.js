
window.onload = function() {
    const form = document.getElementById("formulario");
    let nombre = document.getElementById("nombre");
    let email = document.getElementById("correo");
    let mensaje = document.getElementById("mensaje");
    let errorNombre = document.getElementById("errorNombre");
    let errorMail = document.getElementById("errorMail");
    let errorMensaje = document.getElementById("errorMensaje");

    /* Comprobacion alfanumerica */
    var letras = "abcdefghijklmnopqrstuvwxyz";
    var numeros = "0123456789";
    var correcto = 0;
    var correctonum = 0;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        for (var i = 0; i < nombre.value.length; i++) {
            correcto = 0;
            for (var j = 0; j < letras.length; j++) {
                if (letras.charAt(j) == nombre.value.charAt(i)) {
                    correcto++;
                }
            }
            for (var l = 0; l < numeros.length; l++) {
                if (numeros.charAt(l) == nombre.value.charAt(i)) {
                    correcto++;
                }
            }
        }
        if (correcto == 0) {
            nombre.style.borderColor= 'red';
            errorNombre.style.display='block';
            errorNombre.innerHTML='Hay caracteres no admitidos en el nombre';
        } else {
            var emailID = email.value;
            atpos = emailID.indexOf("@");
            dotpos = emailID.lastIndexOf(".");
            if (atpos < 1 || ( dotpos - atpos < 2 )) {
                email.style.borderColor= 'red';
                errorMail.style.display='block';
                errorMail.innerHTML='El mail ingresado no es correcto';
                 }
                 else {
                    x = mensaje.value;
                    longitud = x.length;
                    if (longitud<"5") {
                    console.log(longitud)
                    mensaje.style.borderColor= 'red';
                    errorMensaje.style.display='block';
                    errorMensaje.innerHTML='El mensaje debe mostrar al menos 5 caracteres';
                 } else {
                        console.log(longitud)
                        modal.style.display = "block";   
                        document.getElementById('nombre').value="";
                        document.getElementById('correo').value="";
                        document.getElementById('mensaje').value="";
                    }
            }}
        
     /*    if (x = "string" ) {
            console.log("Nombre ok");
            var emailID = email.value;
            atpos = emailID.indexOf("@");
            dotpos = emailID.lastIndexOf(".");
            if (atpos < 1 || ( dotpos - atpos < 2 )) {
                email.style.borderColor= 'red';
                errorMail.style.display='block';
                errorMail.innerHTML='El mail ingresado no es correcto';
                 }
            else {
                x = mensaje;
                longitud = x.length;
                if (longitud<"5") {
                    console.log(longitud)
                    mensaje.style.borderColor= 'red';
                    errorMensaje.style.display='block';
                    errorMensaje.innerHTML='El mensaje debe mostrar al menos 5 caracteres';
                    
                }
                else {
                    console.log(longitud)
                    modal.style.display = "block";
                }
            }
            
        } else {
            nombre.style.borderColor= 'red';
            errorNombre.style.display='block';
            errorNombre.innerHTML='Hay caracteres no admitidos en el nombre/El nombre';
        }*/
        })
    ;
    
     /* MODAL */
        // Get the modal
        const modal = document.getElementById("myModal");
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        
        // When the user clicks the button, open the modal 
        span.onclick = function() {
            modal.style.display = "block";
        }
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
    

    }
    ;
    


     /*var emailID = email.value;
                atpos = emailID.indexOf("@");
                dotpos = emailID.lastIndexOf(".");
                if (atpos < 1 || ( dotpos - atpos < 2 )) {
                    alert("El email no es correcto");
                    alert(emailID);
                    document.forms["form"]["fmail"].focus();
                    return false; }
                else {
                       let emailid2 = email2.value;
                       if (emailid2 != emailID)
                       {
                        email2.style.borderColor= 'red';
                        email.style.borderColor= 'red';
                        errorMail2.style.display='block';
                        errorMail.innerHTML='Los correos no coinciden';
                        errorMail2.innerHTML='Los correos no coinciden';
                        }
                        else {
                            pass = passwd.value;
                            pass2 = passwd2.value;
                            if (pass2 == pass) {
                                
                                modal.style.display = "block";
                            }
                            else {
    
                                passwd2.style.borderColor= 'red';
                                passwd.style.borderColor= 'red';
                                errorPass.style.display='block';
                                errorPass.innerHTML='Las contraseñas no coinciden';
                            }
    
                        
                       }
                    }
                
    */
       