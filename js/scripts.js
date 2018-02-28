$(document).ready(function() {
	var cont = 0;
	for(col = 0; col <= 7; col++){
		$(".tablero").append("<div id='col-" + col + "' class='columna'></div>")

		for(row = 0; row <= 8; row++){
			cont += 1;
			var valor = parseInt(cont);
			var tipo = (valor%2)?"Impar":"Par";
			var ficha = ""
			if (row <= 2){
				ficha = "<div class='fichas fichas-rojas' ></div>";
			}
			if (row >= 6){
				ficha = "<div class='fichas fichas-azules' ></div>";
			}
			if (tipo == "Impar" ){
				$("#col-" + col).append("<div id='" + col + "-" +  row + "' class='caja-negra'></div>")
			}else{
				$("#col-" + col).append("<div id='" + col + "-" +  row + "' class='caja-blanca'>" + ficha + "</div>")
			}
		}
	}

    $('.fichas-rojas, .fichas-azules').draggable({
        disabled: true,
        move: "move",
        containment: ".tablero",
        snap: ".fichas",
        snapMode: "inner",
        snapTolerance: 40,
        revert: true,
        revertDuration: 400,
    });

    $('.fichas-rojas, .fichas-azules').draggable('enable')

	//$(".fichas-rojas").draggable({ revert: 'invalid' });
	//$(".fichas-azules").draggable({ revert: 'invalid' });

	/*$(".caja-negras").droppable({
		drop: function(event, ui) {
			$(".fichas-rojas").draggable({ revert: 'valid' });
			$(".fichas-azules").draggable({ revert: 'valid' });			
		}
	});*/

	$(".caja-blanca").droppable({
		accept: ".fichas-azules, .fichas-rojas",
		drop: function(event, ui) {
			var col = parseInt($(this).attr('id').substr(0, 1));
			var row = parseInt($(this).attr('id').substr(2, 4));
			var col_old = parseInt($(ui.draggable).parent().attr("id").substr(0, 1));
			var row_old = parseInt($(ui.draggable).parent().attr("id").substr(2, 4));

			$(".fichas-rojas").draggable({ revert: 'valid' });
			$(".fichas-azules").draggable({ revert: 'valid' });
			if ($(this).children().length === 0){

				if ($(ui.draggable).hasClass("fichas-rojas")){
                	

					if( row_old === (row - 1) ){
						$(this).append(ui.draggable);
						$(".fichas-rojas").draggable({ revert: 'invalid' });
	                    $('.fichas-azules').draggable('enable');
	                    $('.fichas-rojas').draggable('disable');

	                } else if (row_old === (row - 2)) {
	                	var col_ficha = (col > col_old) ? col_old + 1 : col_old - 1;
	                	var id_ficha = "#" + col_ficha  + "-" + (row - 1);
	                	if ($($(id_ficha).children()).hasClass( "fichas-azules" ) ){
							$(this).append(ui.draggable);
							$(".fichas-rojas").draggable({ revert: 'invalid' });
	                		$(id_ficha).empty();
	                		$("#rojos").append("<div class='puntos_rojos'></div>");
		                    $('.fichas-azules').draggable('enable');
		                    $('.fichas-rojas').draggable('disable');
	                	}

	                }
				}else if ($(ui.draggable).hasClass("fichas-azules")) {
					if( row_old === (row + 1) ){
						$(this).append(ui.draggable);
						$(".fichas-azules").draggable({ revert: 'invalid' });
	                    $('.fichas-azules').draggable('disable');
	                    $('.fichas-rojas').draggable('enable');

	                } else if (row_old === (row + 2)) {
	                	var col_ficha = (col > col_old) ? col_old + 1 : col_old - 1;
	                	var id_ficha = "#" + col_ficha  + "-" + (row + 1);

	                	if ($($(id_ficha).children()).hasClass( "fichas-rojas" ) ){
							$(this).append(ui.draggable);
							$(".fichas-azules").draggable({ revert: 'invalid' });
	                		$(id_ficha).empty();
	                		$("#azules").append("<div class='puntos_azules'></div>");
		                    $('.fichas-azules').draggable('disable');
		                    $('.fichas-rojas').draggable('enable');
	                	}
	                }
				}
			}
		},

	});

 


});	