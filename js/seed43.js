		if(typeof String.prototype.trim !== 'function') {
			String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
		}
/*! ###################### Question for 39F ##############################*/
		function cho_hangul(str) {
			cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
			result = "";
			for(i=0;i<str.length;i++) {
				code = str.charCodeAt(i)-44032;
				if(code>-1 && code<11172)
					result += cho[Math.floor(code/588)];
				else
					result += str.substring(i, i+1);
			}
			return result;
		}
    var db_39 = [];
		function apply39find(obj){
			if(obj.old_value == obj.value) return;
			obj.old_value = obj.value;
			var regex = /([\s<>\\\/])/gi;
			var txt=$(obj).val().trim().replace(regex, '').replace(/ㄳ/g,"ㄱㅅ").replace(/ㄵ/g,"ㄴㅈ").replace(/ㄶ/g,"ㄴㅎ").replace(/ㄺ/g,"ㄹㄱ").replace(/ㄻ/g,"ㄹㅁ").replace(/ㄼ/g,"ㄹㅂ").replace(/ㄽ/g,"ㄹㅅ").replace(/ㄾ/g,"ㄹㅌ").replace(/ㄿ/g,"ㄹㅍ").replace(/ㅀ/g,"ㄹㅎ").replace(/ㅄ/g,"ㅂㅅ");
			$("#q_39_1").children().not(".template").remove();
			if(txt=="") return;
			var txtcho=cho_hangul(txt).split(",");
			txt=txt.split(",");
			$.each(db_39, function(key, val){
				var newval=new Object();
				var used=[];
				$.each(val, function(key2, val2){
					var txtIndex;
					var val2_copy = val2;
					for(var i=0; i<txt.length; i++){
						var val2_trim=val2_copy.replace(regex, '');
						if((txtIndex=val2_trim.indexOf(txt[i])) != -1 || (txtIndex=cho_hangul(val2_trim).indexOf(txtcho[i])) != -1){
							var result;
							var p1=val2_trim.substring(0, txtIndex);
							var p2=val2_trim.substring(txtIndex, txtIndex+txt[i].length);
							var p3=val2_trim.substring(txtIndex+txt[i].length);
							while (result = regex.exec(val2_copy)) {
								if(result.index < p1.length){
									p1=p1.substring(0, result.index) + result[1] + p1.substring(result.index);
								} else if(result.index < p1.length+p2.length){
									p2=p2.substring(0, result.index-p1.length) + result[1] + p2.substring(result.index-p1.length);
								}else{
									p3=p3.substring(0, result.index-p1.length-p2.length) + result[1] + p3.substring(result.index-p1.length-p2.length);
								}
							}
							val2_copy = p1 + "<span class='highlight'>" + p2 + "</span>" + p3;
							used[i]=true;
						}
					}
					newval[key2] = val2_copy;
				});
				if($("#q_39_1").children().length > 8) return true;
				for(i=0; i<txt.length && used[i]; i++);
				if(i==txt.length){
					var obj=$("#q_39_1").find(".template").clone().removeClass("template").css("display", "block");
					$.each(val, function(key2, val2){
						obj.find("."+key2).html(newval[key2]?newval[key2]:val[key2]);
					});
					obj.find(".al"+val.a).addClass("rightanswer");
					$("#q_39_1").append(obj);
				}
				delete newval;
				delete used;
			});
		}
		$(function() {
      $.ajax({
        url: 'probs.json',
        method: 'get',
        dataType: 'json',
        success: function(sources) {
          db_39 = sources;
        }
      });

			$(".increasing").each(function(){
				var obj = $("<span style='float:right'><button onclick='return decrease($(this));'>-</button></span>");
				var par = $(this).parent();
				obj.insertAfter(this);
				$(this).detach();
				obj.append(this).append("<button onclick='return increase($(this));'>+</button>");
			});
			var changecolor=function(aa){
				if(!aa) aa=this;
				if(aa.target) aa = aa.target;
				if($(aa).prop("type")=="radio"){
					if($("input[name='" + aa.name + "']:checked").length==0){
						if($(aa).parent().is("label")) aa=$(aa).parent();
						$(aa).parent().addClass("empty");
					}else{
						if($(aa).parent().is("label")) aa=$(aa).parent();
						$(aa).parent().removeClass("empty");
					}
				}else{
					if($(aa).val().length==0)
						$(aa).addClass("empty");
					else
						$(aa).removeClass("empty");
				}
				if($(aa).is("select")){
					$(aa).next().prop("disabled", $(aa).val().length==0);
				}else if($(aa).is("#3q_35_h, #q_35_m, #q_35_s")){
					var t = parseInt($("#q_35_s").val()) || 0;
					t += 60*(parseInt($("#q_35_m").val()) || 0)
					t += 3600*(parseInt($("#q_35_h").val()) || 0)
					$("#q_35_0").val(t);
				}else if($(aa).prop("id").indexOf("q_36_1_")==0){
					var res="";
					for(var i = 1; i<=8; i++){
						if($("input[name='q_36_1_" + i + "']:checked").length==0){
							$("#q_36_disp_" + i).text("");
							res+="?";
						}else{
							var cur=$("input[name='q_36_1_" + i + "']:checked").val();
							if(cur==1) $("#q_36_disp_" + i).text("1 菇菇寶貝");
							if(cur==2) $("#q_36_disp_" + i).text("2 藍寶");
							if(cur==3) $("#q_36_disp_" + i).text("3 緞帶肥肥");
							if(cur==4) $("#q_36_disp_" + i).text("4 綠水靈");
							res+=$("input[name='q_36_1_" + i + "']:checked").val();
						}
					}
					$("#q_36_1").val(res);
					if(res.indexOf("?")>=0)
						$("#q_36_1").addClass("empty");
					else
						$("#q_36_1").removeClass("empty");
				}else if($(aa).prop("id").indexOf("q_26_")==0){
					if($("#q_26_0_0").val().length==0 || $("#q_26_0_1").val().length==0 || $("#q_26_0_2").val().length==0){
						$("#q_26_0").val(0);
						$("#q_36_1").addClass("empty");
					}else{
						var res=parseInt($("#q_26_0_2").val()) - parseInt($("#q_26_0_0").val()) + 10*parseInt($("#q_26_0_1").val())
						$("#q_26_0").val(res);
						$("#q_36_1").removeClass("empty");
					}
				}
				return true;
			};
			$("input, select").not("input#q_39_0").change(changecolor);
			$("input, select").not("input#q_39_0").click(changecolor);
			$("input, select").not("input#q_39_0").select(changecolor);
			$("input, select").not("input#q_39_0").keydown(changecolor);
			$("input, select").not("input#q_39_0").keypress(changecolor);
			$("input, select").not("input#q_39_0").keyup(changecolor);
			$("input, select").not("input#q_39_0").each(function(){
				return changecolor(this);
			});
			$("input#q_39_0").keyup(function(e) {
				if (e.keyCode == 27) { 
					$(this).val("");
					$("#q_39_1").children().not(".template").remove();
				}
			}).keypress(function(event){
				if ( event.which == 13 ) {
					event.preventDefault();
				}
			}).on("propertychange input",function(ev){
				apply39find(this);
			}).on("input",function(){
				apply39find(this);
			});
		});
		function increase(obj){
			if(obj.parent().find("input").val().length==0)
				obj.parent().find("input").val(0);
			else
				obj.parent().find("input").val(parseInt(obj.parent().find("input").val())+1);
			$(obj.parent().find("input")).removeClass("empty");
			return false;
		}
		function decrease(obj){
			if(obj.parent().find("input").val().length==0)
				obj.parent().find("input").val(0);
			else
				obj.parent().find("input").val(parseInt(obj.parent().find("input").val())-1);
			$(obj.parent().find("input")).removeClass("empty");
			return false;
		}
		function toggleText(obj){
			if(obj.val() == 0){
				obj.val(1);
				obj.text("[使用]");
				obj.css("font-weight", "bold");
			}else{
				obj.val(0);
				obj.text("[未使用]");
				obj.css("font-weight", "normal");
			}
		}
		function addCard(color, colorName, index){
			var card=$("#card_form").html();
			selection = colorName + " " + index;
			card = card.replace("###1", selection);
			card = $(card);
			card.css("background",color);
			$("#floor2_cards").append(card);
			return false;
		}
				
		function go(k){
			var loc = "".concat("player"+k);
			document.getElementById(loc).play();
        }
		
		function stopgo(k){
			var loc = "".concat("player"+k);
			document.getElementById(loc).pause();
		}
		
		function clear36(){
			if(confirm("確定要清除?")){
									$("input[name='q_36_1_1']").prop("checked",false).parent().addClass("empty");
					$("#q_36_disp_1").text("");
									$("input[name='q_36_1_2']").prop("checked",false).parent().addClass("empty");
					$("#q_36_disp_2").text("");
									$("input[name='q_36_1_3']").prop("checked",false).parent().addClass("empty");
					$("#q_36_disp_3").text("");
									$("input[name='q_36_1_4']").prop("checked",false).parent().addClass("empty");
					$("#q_36_disp_4").text("");
									$("input[name='q_36_1_5']").prop("checked",false).parent().addClass("empty");
					$("#q_36_disp_5").text("");
									$("input[name='q_36_1_6']").prop("checked",false).parent().addClass("empty");
					$("#q_36_disp_6").text("");
									$("input[name='q_36_1_7']").prop("checked",false).parent().addClass("empty");
					$("#q_36_disp_7").text("");
									$("input[name='q_36_1_8']").prop("checked",false).parent().addClass("empty");
					$("#q_36_disp_8").text("");
								$("#q_36_1").val("????????????").addClass("empty");
			}
		}
		$(function(){
			window.onbeforeunload = function(e) { return '確定要關閉?'; };
		});
