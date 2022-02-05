// $([selector]).[action](callback)
$(document).ready(function () {
    //alert("mensaje")
    CountryLoad()
    // CountryLoad2()

    CityLoad2()
    CityLoad3()
    CategoryLoad()
    SaveCountry()
    SaveCity()
    SavePlace()
    SaveComment()

    Login()
    Register()

    $("#DropCountry2").change(function () {
        CityLoad2()
    })

    $("#DropCountry3").change(function () {
        CityLoad3()
    })
    $("#DropCity3").change(function () {
        PlaceLoad3()
    })

    $("#btnLogin").click(function () {
        $("#log").show()
    })

    $("#btnLogModalClose").click(function () {
        $("#log").hide()
    })
    $("#btnRegister").click(function () {
        $("#Register").show()
    })

    $("#btnRegModalClose").click(function () {
        $("#Register").hide()
    })

})

function CountryLoad() {
    $.ajax({
        method: "get",
        url: "https://localhost:44349/api/Paises",
        success: function (data) {
            $("#DropCountry").find('option').remove();
            $("#DropCountry").append('<option value="0"> Seleccione...</option>');

            $("#DropCountry2").find('option').remove();
            $("#DropCountry2").append('<option value="0"> Seleccione...</option>');

            $("#DropCountry3").find('option').remove();
            $("#DropCountry3").append('<option value="0"> Seleccione...</option>');

            $(data).each(function (i, v) { // indice, valor
                $("#DropCountry").append('<option value="' + v.CountryId + '">' + v.CountryName + '</option>');
                $("#DropCountry2").append('<option value="' + v.CountryId + '">' + v.CountryName + '</option>');
                $("#DropCountry3").append('<option value="' + v.CountryId + '">' + v.CountryName + '</option>');
            })
            //debugger
            //$("#f1").submit()
        }
    });
}

function CityLoad2() {
    $.ajax({
        method: "get",
        url: "https://localhost:44349/api/Ciudad?countryId=" + $("#DropCountry2").val(),
        success: function (data) {
            $("#DropCity2").find('option').remove();
            $("#DropCity2").append('<option value="0"> Seleccione...</option>');
            $(data).each(function (i, v) { // indice, valor
                $("#DropCity2").append('<option value="' + v.CityId + '">' + v.CityName + '</option>');
            })
        }
    });
}

function CityLoad3() {
    $.ajax({
        method: "get",
        url: "https://localhost:44349/api/Ciudad?countryId=" + $("#DropCountry3").val(),
        success: function (data) {
            $("#DropCity3").find('option').remove();
            $("#DropCity3").append('<option value="0"> Seleccione...</option>');
            $(data).each(function (i, v) { // indice, valor
                $("#DropCity3").append('<option value="' + v.CityId + '">' + v.CityName + '</option>');
            })
        }
    });
}

function PlaceLoad3() {
    $.ajax({
        method: "get",
        url: "https://localhost:44349/api/Lugar?cityId=" + $("#DropCity3").val(),
        success: function (data) {
            $("#xw").empty()
            $(data).each(function (i, v) { // indice, valor
                $("#DropPlace").find('option').remove();
                $("#DropPlace").append('<option value="0"> Seleccione...</option>');
                $(data).each(function (i, v) { // indice, valor
                    $("#DropPlace").append('<option value="' + v.PlaceId + '">' + v.PlaceName + '</option>');
                })

            })
        }
    });
}

function CategoryLoad() {
    $.ajax({
        method: "get",
        url: "https://localhost:44349/api/Categoria",
        success: function (data) {
            $(data).each(function (i, v) { // indice, valor
                $("#DropCategory").find('option').remove();
                $("#DropCategory").append('<option value="0"> Seleccione...</option>');
                $(data).each(function (i, v) { // indice, valor
                    $("#DropCategory").append('<option value="' + v.CategoryId + '">' + v.CategoryName + '</option>');
                })

            })
        }
    });
}

function SaveCountry() {
    $("#btnAddCountry").click(function (e) {
        e.preventDefault()
        var x = $("#paisIn").val()
        if (x != "") {
            var data = [{ CountryName: $("#paisIn").val() }];
            $.ajax({
                method: "post",
                url: "https://localhost:44349/api/Paises",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data) {
                    alert(data)
                }
            })
            $("#paisIn").val("")
        } else {
            alert("El campo no puede estar en blanco")
        }
    });
    CountryLoad()
}

function SaveCity() {
    $("#btnAddCity").click(function (e) {
        e.preventDefault()
        var x = $("#ciudadIn").val()
        var p = $("#DropCountry").val()
        if (x != "" && p != 0) {
            var data = [{ CountryId: $("#DropCountry").val(), CityName: $("#ciudadIn").val() }];
            $.ajax({
                method: "post",
                url: "https://localhost:44349/api/Ciudad",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data) {
                    alert(data)
                }
            })
            $("#ciudadIn").val("")
        } else {
            alert("Selecciones un pais o llene el campo")
        }
    });
}

function SavePlace() {
    $("#btnAddPlace").click(function (e) {
        e.preventDefault()
        var x = $("#PlaceIn").val()
        var p = $("#DropCountry2").val()
        var q = $("#DropCity2").val()
        if(x=!"" && p!=0 && q!=0){

        var data = [{ CountryId: $("#DropCountry2").val(), CityId: $("#DropCity2").val(), PlaceName: $("#placeIn").val() }];
        $.ajax({
            method: "post",
            url: "https://localhost:44349/api/Lugar",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                alert(data)
            }
        })
        $("#placeIn").val("")
    }else{
        alert("Seleccione un pais o ciudad valido o llene el campo")
    }
    });
}

function SaveComment() {
    $("#btnAddComment").click(function (e) {
        e.preventDefault()
        var x = $("#Comment").val()
        var p = $("#DropPlace").val()
        var q =$("#DropCategory").val()
        if(x=!"" && p!=0 && q!=0){
        var data = [{ PlaceId: $("#DropPlace").val(), CategoryId: $("#DropCategory").val(), Comment: $("#Comment").val(), N_likes: 0, UsuarioId: 1 }];
        $.ajax({
            method: "post",
            url: "https://localhost:44349/api/Comentario",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                alert(data)
            }
        })
        $("#Comment").val("")
    }else{
        alert("Seleccione un lugar valido o llene la recomendacion")
    }
    });
}

function Login() {
    $.ajax({
        method: "get",
        url: "https://localhost:44349/api/Lugar?cityId=" + $("#DropCity").val(),
        success: function (data) {
            $("#xw").empty()
            $(data).each(function (i, v) { // indice, valor
                $("#xw").append('<div class="card" style="width: 18rem;  margin: 5px;"><img class="card-img-top" src="img/col/col1.jpg" alt="Card image cap"><div class="card-body"><p class="card-text" id="card1ID" hidden>' + v.PlaceId + '</p><h5 class="card-title" id="card1Title">' + v.PlaceName + '</h5><p class="card-text" id="card1Text"></p><a href="detalles.html?place=' + v.PlaceId + '" class="btn btn-primary">Go somewhere</a></div></div>'
                )
            })
        }
    });
}

function Register() {

}
