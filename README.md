Bulb ON OFF
<html>

<head>
    <title>Bulb On/Off</title>
    <style>
        #bulb {
            width: 100px;
            height: 150px;
        }

        #p {
            font-size: larger;
            color: red;
        }

        #pp {
            font-size: 20px;
            color: red;
        }
    </style>
</head>

<body>
    <center>
        <P id="pp">Alert Don't touch the Bulb</P>
        <input type="button" onclick="fun()" value="On">
        <img src="https://www.w3schools.com/js/pic_bulboff.gif" height="350px" width="274px" id="pic" onclick="crc()"
            onclick="Reload">
        <input type="button" onclick="func()" value="Off">
        <p id="p"></p>
    </center>
    <script>
        function fun() {
            document.getElementById("pic").src = "https://www.w3schools.com/js/pic_bulbon.gif";
            
        }
        function func() {
            document.getElementById("pic").src = "https://www.w3schools.com/js/pic_bulboff.gif";
            location.reload();
        }
        function crc() {
            document.getElementById("pic").src = "https://st.depositphotos.com/2074779/2595/i/950/depositphotos_25959489-stock-photo-light-bulb-broken.jpg";
            document.getElementById("p").innerHTML = "Shit!you broke the bulb<br>TAP ON or OFF <br> to restore"
        }
    </script>


    <script>
    </script>
</body>

</html>
