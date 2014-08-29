
    var decider = 0;
    $(document).on("pagebeforeshow","#borcSorgulama",function(){

        if(decider ==0)
        {
        alert('Borç sorgulama aktif internet bağlantısı gerektirmektedir.');
        decider = 1;
        }

    });

    $(document).on("pageinit","#suBorcu", function() {
        var query;
        $('#suAboneSorgu').click(function(event){


        $.mobile.loading('show', {theme:"a", text:"Lütfen Bekleyin...", textVisible: true});

    query=$("#suBorcAboneTB").val();

    $.getJSON('http://91.151.82.135:88/webConsumer.php?suBorcAboneTB='+query+"&callback=?")
    .done(function( data ) {

        $.mobile.loading('hide');
        $("#suAboneSonuc").empty();
        $("#suKimlikSonuc").empty();
        $("#aboneNoPaneli").empty();


        if(data.decider == 0)
        {
        if(data.reference == 0)
        $("#suAboneSonuc").html('<p style="color:red">Abone numaranızı yanlış girdiniz, lütfen xx-xxx-xxxx-xx formatında giriniz.</p> ')
        else
        $("#suAboneSonuc").html('<p style="color:red">Borcunuz bulunmamaktadır, teşekkür ederiz.</p>')
        }
    else
                            {
                                $.each(data,function(i,table){
                                    $("#suAboneSonuc").html('<table><tr><td>Su:</td><td>'+parseFloat(data.su).toFixed(2)+'</td>' +
                                        '<tr><td>Temizlik:</td><td>'+parseFloat(data.cop).toFixed(2) +'</td></tr>' +
                                        '<tr><td>Aydınlatma:</td><td>'+parseFloat(data.ayd).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Sağlık:</td><td>'+parseFloat(data.saglik).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Kanalizasyon:</td><td>'+parseFloat(data.kanal).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Ek Hizmetler:</td><td>'+parseFloat(data.genelBorc).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Toplam:</td><td>'+parseFloat(data.total).toFixed(2)+'</td></tr></table>');


                                });
    }

    });
    });

    $('#suKimlikSorgu').click(function(event){


        $.mobile.loading('show', {theme:"a", text:"Lütfen Bekleyin...", textVisible: true});

    query=$("#suKimlikTB").val();

    $.getJSON('http://91.151.82.135:88/webConsumer.php?suKimlikTB='+query+"&callback=?")
    .done(function( data ) {

        $.mobile.loading('hide');
        $("#suKimlikSonuc").empty();
        $("#aboneNoPaneli").empty();
        $("#suAboneSonuc").empty();
        $("#aboneNos").empty();


        if(data.decider == 0)
        {
        $("#suKimlikSonuc").html('<p style="color:red">Kimlik numaranız bulunamadı, lütfen abone numarası ile arama yapınız.</p>');

        }

    else
                            {
                                $("#aboneNoPaneli").append( '<p>Kayıtlı abone numaraları:</p><select id="aboneNos"></select><br/><a data-role="button" id="aboneKimlikSorgula" data-theme="a">Sorgula</a>').trigger("create");
                                var $option = $("#aboneNos");

                                var s=0;
                                var increment=0;

                                $.each(data,function(name,value){
                                if(data.kisiselMno.MNOnumbers.length > 1)
                                {
                                $.each(data.kisiselMno.MNOnumbers,function(name,value){
                                $option.append($('<option></option>').attr("value", increment).text(value.mnoNumber));
                                s++;
                                value++;

                                });
    }
    else
    $option.append($('<option></option>').attr("value", increment).text(data.kisiselMno.MNOnumbers.mnoNumber));

    $('#aboneNos').selectmenu('refresh', true);

    $("#suKimlikSonuc").html('<table><tr><td>Su:</td><td>'+parseFloat(data.su).toFixed(2)+'</td>' +
    '<tr><td>Temizlik:</td><td>'+parseFloat(data.cop).toFixed(2) +'</td></tr>' +
    '<tr><td>Aydınlatma:</td><td>'+parseFloat(data.ayd).toFixed(2)+'</td></tr>' +
    '<tr><td>Sağlık:</td><td>'+parseFloat(data.saglik).toFixed(2)+'</td></tr>' +
    '<tr><td>Kanalizasyon:</td><td>'+parseFloat(data.kanal).toFixed(2)+'</td></tr>' +
    '<tr><td>Ek Hizmetler:</td><td>'+parseFloat(data.genelBorc).toFixed(2)+'</td></tr>' +
    '<tr><td>Toplam:</td><td>'+parseFloat(data.total).toFixed(2)+'</td></tr></table>');


    return false;
    });
    }
    });


    });

    $(document).on('click','#aboneKimlikSorgula', function()
            {

                $.mobile.loading('show', {theme:"a", text:"Lütfen Bekleyin...", textVisible: true});

    query=$("#aboneNos :selected").text();

    $.getJSON('http://91.151.82.135:88/webConsumer.php?suBorcAboneTB='+query+"&callback=?")
    .done(function( data ) {

        $.mobile.loading('hide');
        $("#suAboneSonuc").empty();
        $("#suKimlikSonuc").empty();



        $.each(data,function(i,table){
        $("#suKimlikSonuc").html('<table><tr><td>Su:</td><td>'+parseFloat(data.su).toFixed(2)+'</td>' +
        '<tr><td>Temizlik:</td><td>'+parseFloat(data.cop).toFixed(2) +'</td></tr>' +
        '<tr><td>Aydınlatma:</td><td>'+parseFloat(data.ayd).toFixed(2)+'</td></tr>' +
        '<tr><td>Sağlık:</td><td>'+parseFloat(data.saglik).toFixed(2)+'</td></tr>' +
        '<tr><td>Kanalizasyon:</td><td>'+parseFloat(data.kanal).toFixed(2)+'</td></tr>' +
        '<tr><td>Ek Hizmetler:</td><td>'+parseFloat(data.genelBorc).toFixed(2)+'</td></tr>' +
        '<tr><td>Toplam:</td><td>'+parseFloat(data.total).toFixed(2)+'</td></tr></table>');
        });


    });
    });
    });

    $(document).on("pageinit","#adresRehberi", function() {

        var tur;
        var isim;


        $.getJSON('http://91.151.82.135:88/poi_search.php?bUnique=1')
            .done(function( data ) {

                var $option = $("#tur");


                $.each(data, function() {
                    $option.append($("<option />").val("mem").text(this.Type_tr));
                });


            });

        $("#tur").on('change',function(){

            $('#isim').empty();

            query=$("#tur :selected").text();


            $.getJSON('http://91.151.82.135:88/poi_search.php?bUnique=1&type_tr='+query)
                .done(function( data ) {

                    var $option = $("#isim");


                    $.each(data, function() {
                        $option.append($("<option />").val("mem").text(this.Name));
                    });


                });
        });

        $("#isim").on('change',function(){

            tur = $("#tur :selected").text();
            isim = $("#isim :selected").text();


            var kullaniciDatasi = [tur, isim];
            var jsonText = JSON.stringify(kullaniciDatasi);
            localStorage.setItem("Lokal Data", jsonText);

        });

    });


    $(document).on("pageinit","#emlakBorcu", function() {


        $('#emlakTgeSorgu').click(function(event){

            $.mobile.loading('show', {theme:"a", text:"Lütfen Bekleyin...", textVisible: true});

    query=$("#emlakTgeTB").val();

    $.getJSON('http://91.151.82.135:88/webConsumer.php?emlakTgeTB='+query+'&callback=?')
    .done(function( data ) {
        //alert("clicked");

        $.mobile.loading('hide');
        $("#emlakTgeDiv").empty();
        $("#emlaKimlikDiv").empty();



        if(data.decider == 0)
        {
        if(data.reference == 0)
        $("#emlakTgeDiv").html('<p style="color:red">TGE Numaranız bulunamadı, lütfen TGEXXXXXX şeklinde 9 hane olarak giriniz.<p style="color:red">');
        else
        $("#emlakTgeDiv").html('<p style="color:red">Emlak borcunuz bulunmamaktadır, teşekkür ederiz.<p style="color:red">');

        }
    else

                            {
                                $.each(data,function(i,table){
                                    $("#emlakTgeDiv").html('<table><tr><td>Bakiye:</td><td>'+parseFloat(data.bakiye).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Gecikme Zammı:</td><td>'+parseFloat(data.bakiyeCezaKalan).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Cari Dönem:</td><td>'+parseFloat(data.cariDonem).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Toplam:</td><td>'+parseFloat(data.bakiye+data.bakiyeCezaKalan+data.cariDonem).toFixed(2)+'</td></tr></table>');
                                });

    }
    });
    });

    $('#emlakKimlikSorgu').click(function(event){

        $.mobile.loading('show', {theme:"a", text:"Lütfen Bekleyin...", textVisible: true});

    query=$("#emlakKimlikTB").val();

    $.getJSON('http://91.151.82.135:88/webConsumer.php?emlakKimlikTB='+query+'&callback=?')
    .done(function( data ) {
        //alert("clicked");

        $.mobile.loading('hide');
        $("#emlaKimlikDiv").empty();
        $("#emlakTgeDiv").empty();


        if(data.decider == 0)
        {
        if(data.reference == 0)
        $("#emlaKimlikDiv").html('<p style="color:red">Kimlik numaranız bulunamadı, lütfen TGE numaranıza göre arama yapınız.<p style="color:red">');
        else
        $("#emlaKimlikDiv").html('<p style="color:red">Emlak borcunuz bulunmamaktadır, teşekkür ederiz.<p style="color:red">');

        }
    else
                            {
                                $.each(data,function(i,table){
                                    $("#emlaKimlikDiv").html('<table><tr><td>Bakiye:</td><td>'+parseFloat(data.bakiye).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Gecikme Zammı:</td><td>'+parseFloat(data.bakiyeCezaKalan).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Cari Dönem:</td><td>'+parseFloat(data.cariDonem).toFixed(2)+'</td></tr>' +
                                        '<tr><td>Toplam:</td><td>'+parseFloat(data.bakiye+data.bakiyeCezaKalan+data.cariDonem).toFixed(2)+'</td></tr></table>');
                                });

    }
    });
    });

    });



