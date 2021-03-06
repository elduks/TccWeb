$(function(){
	$('.error').hide();	
	
	$('#gravar').click(function(){		
		$('.error').hide();
		
		var tipo = $('#tipoPessoa').val();
		var certificado = $('#certificado').val();
		var nome = $('#nome').val();
		var rg = $('#rg').val();
		var cpf = $('#cpf').val();
		
		if(tipo == ''){
			$('#error_Tipo').show();
			return false;
		}
		
		if(tipo == '2')
			if(certificado == ''){
				$('#error_Certificado').show();
				return false;
			}
		
		if(nome == ''){
			$('#error_Nome').show();
			return false;
		}
		
		if(rg == ''){
			$('#error_Rg').show();
			return false;
		}
		
		if(cpf == ''){
			$('#error_Cpf').show();
			return false;
		}
		
		if(tipo == 1){
			$('#digital').dialog({
				autoOpen: true,
				width:600,
				modal:true,
				open: function(){
					$.ajax({
						url: "lerDigital.jsp",
						cache: false,
						beforeSend: function(){
							$('#digital').html("Fa&ccedil;a a leitura da sua digital <span id=qtde>4</span> vezes<br /><img src='img/load.gif' />");
						},
						success: function(data){
							$('#digital').html(data);
							$('#digital').dialog("close");
							var dedo = $('#dedo').val();
							if(dedo == undefined){
								$('#error_Digital').show();
								return false;
							}
							gravarDados('tipoPessoa=' + tipo + '&nome=' + nome + '&rg=' + rg + '&cpf=' + cpf + '&certificado=' + certificado);
						}
					});
				}
			});
		}
		
		if(tipo == 2){
			gravarDados('tipoPessoa=' + tipo + '&nome=' + nome + '&rg=' + rg + '&cpf=' + cpf + '&certificado=' + certificado);
		}
	});
	}
);

function retornarOpcao(opcao){
	if(opcao == 2){
		$('#tituloNome').html('Raz&atilde;o Social:');
		$('#tituloRg').html('IE:');
		$('#tituloCpf').html('CNPJ:');
	}
	else{
		$('#tituloNome').html('Nome:');
		$('#tituloRg').html('RG:');
		$('#tituloCpf').html('CPF:');
	}
}

function gravarDados(data){
	$.ajax({
		url: "gravarPessoa.jsp",
		cache:false,
		type: "POST",
		data: data,
		beforeSend:function(){
			$('#areaAjax').html("Aguarde enquanto seus dados s&atilde;o gravados<br /><img src='img/load.gif' />");
		},
		success: function(data){
			$('#areaAjax').html(data);
			$('#logado').val('1');
			tratarMenu();
		}
	});	
}