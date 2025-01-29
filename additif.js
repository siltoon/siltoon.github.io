/* Fichier js de gestion */


var CST_TOFIND = 0;

var CALC = 0; //le tableau
var OPERATION = 0; //le tableau des operations

var SCORE = 0;

var CST_init = 0;

var OPE1 =0; 
var OPE1_pos=0;
var OPE2 =0;
var OPE2_pos=0;

var VALUE = 0;

	//Une brique
	var Brique = function(d_valeur,d_degre){
		this.valeur = d_valeur;
		this.degre = d_degre;
	}
	
	//Une operation
	var Operation = function(d_valeur,d_text,d_score){
		this.valeur = d_valeur;
		this.text = d_text;
		this.score = d_score;
	}

	function clickBrique(valeur,pos)
	{
	
	if (OPE1 == 0) 
		{
		OPE1 = valeur;
		OPE1_pos = pos;

		
		//Jouabilité, on empeche de cliquer sur les briques interdites
		if (CALC.length==4)
		{
		if (pos==0) {
					document.getElementById('tmp2').onclick="";
					document.getElementById('tmp2').style.backgroundColor="lightgray";
					document.getElementById('tmp2').style.color="gray";
					document.getElementById('tmp3').onclick="";
					document.getElementById('tmp3').style.backgroundColor="lightgray";
					document.getElementById('tmp3').style.color="gray";
					}
		
		if (pos==1) {
					document.getElementById('tmp3').onclick="";
					document.getElementById('tmp3').style.backgroundColor="lightgray";
					document.getElementById('tmp3').style.color="gray";
					}
		
		if (pos==2) {
					document.getElementById('tmp0').onclick="";
					document.getElementById('tmp0').style.backgroundColor="lightgray";
					document.getElementById('tmp0').style.color="gray";
					}

		if (pos==3) {
					document.getElementById('tmp0').onclick="";
					document.getElementById('tmp0').style.backgroundColor="lightgray";
					document.getElementById('tmp0').style.color="gray";
					document.getElementById('tmp1').onclick="";
					document.getElementById('tmp1').style.backgroundColor="lightgray";
					document.getElementById('tmp1').style.color="gray";
					}					
		}
		if (CALC.length==3)
		{
		if (pos==0) {
					document.getElementById('tmp2').onclick="";
					document.getElementById('tmp2').style.backgroundColor="lightgray";
					document.getElementById('tmp2').style.color="gray";
					}
		if (pos==2) {
					document.getElementById('tmp0').onclick="";
					document.getElementById('tmp0').style.backgroundColor="lightgray";
					document.getElementById('tmp0').style.color="gray";
					}
		}
		
		
		
		
		
		return;
		}
	
	if (OPE2 == 0)
		{
		if (pos==OPE1_pos)
			{
				//On clique 2 fois sur le meme nombre
				OPE1=0;
				OPE1_pos=0;
				showTable();
			}
		else
			{
		OPE2 = valeur;
		OPE2_pos = pos;
		
			}
		return;
		}
	else
		{
		//Le cas ou on clique sur une troisième brique, ou sur la même seconde brique, sauf si que 2 brique
		if (CALC.length>2)
		{
		document.getElementById('tmp'+OPE2_pos).style.color="blue";
		OPE2=valeur;
		OPE2_pos = pos;
		}
		
		}
	
	
	
	return 0;
	
	}
	
	function clickOperation(valeur)
	{
	
	if ((OPE1==0) && (OPE2==0)) return false; 
	
	if (valeur == 10) //+
		{
		if (OPE2==0) return false;
		VALUE = OPE1 + OPE2;
		reshape(); //On recalcule le tableau et on l'affiche
		SCORE++;
		showScore();
		return true;
		}
	
	if (valeur == 11) //-
		{
		//VALUE = OPE1 - OPE2;
		if (OPE2==0) return false;
		if (OPE1_pos < OPE2_pos) VALUE=OPE1 - OPE2; else VALUE=OPE2 - OPE1; //Car soustraction non commutative
		reshape();
		SCORE++;
		
		return true;
		}
		
	if (valeur == 12) //*
		{
		if (OPE2==0) return false;		
		VALUE = OPE1 * OPE2;
		reshape();
		SCORE++;
		
		return true;
		}
		
	if (valeur == 13) //|x|
		{
		VALUE = Math.abs(OPE1);
		CALC[OPE1_pos]=new Brique(VALUE,CALC[OPE1_pos].degre++);
		OPE1=0;
		OPE1_pos=0;
		SCORE++;

		
		if ((CALC[0].valeur == CST_TOFIND) && (CALC.length==1)) //Modified
		{
			CST_TOFIND ++;
			init();
			init_operation();
			showTable();

			showNumber();
			
			if (CST_TOFIND>=7) OPERATION.push(new Operation(13,"|x|",0));
			if (CST_TOFIND>=17) OPERATION.push(new Operation(14,"x²",0));
			if (CST_TOFIND>=103) OPERATION.push(new Operation(15,"!",0));
			if (CST_TOFIND>=182) OPERATION.push(new Operation(16,"x3",0));
			if (CST_TOFIND>=813) OPERATION.push(new Operation(17,"x5",0));
			if (CST_TOFIND>=850) OPERATION.push(new Operation(18,"10x",0));
			
			showOperations();
			createCookie('1234',CST_TOFIND,7); //creer un cookie avec la valeur courante pour le chiffre a trouver pour 7 jours			

		}
		else  showTable();
		
		
		//reshape();
		showTable();
		
		return true;
		}
		
		if (valeur == 14) //square
		{
		VALUE = Math.pow(OPE1,2);
		CALC[OPE1_pos]=new Brique(VALUE,CALC[OPE1_pos].degre++);
		OPE1=0;
		OPE1_pos=0;
		SCORE+=1;
		
		if ((CALC[0].valeur == CST_TOFIND) && (CALC.length==1)) //Modified
		{
			CST_TOFIND ++;
			init();
			init_operation();
			showTable();

			showNumber();
			
			if (CST_TOFIND>=7) OPERATION.push(new Operation(13,"|x|",0));
			if (CST_TOFIND>=17) OPERATION.push(new Operation(14,"x²",0));
			if (CST_TOFIND>=103) OPERATION.push(new Operation(15,"!",0));
			if (CST_TOFIND>=182) OPERATION.push(new Operation(16,"x3",0));
			if (CST_TOFIND>=813) OPERATION.push(new Operation(17,"x5",0));
			if (CST_TOFIND>=850) OPERATION.push(new Operation(18,"10x",0));
		
			
			showOperations();
			createCookie('1234',CST_TOFIND,7); //creer un cookie avec la valeur courante pour le chiffre a trouver pour 7 jours			
			
		}
		else  showTable();
		
		
		//reshape();
		showTable();
		
		return true;
		}	
	

		if (valeur == 15) //factorielle
		{
		VALUE = factorielle(OPE1);
		CALC[OPE1_pos]=new Brique(VALUE,CALC[OPE1_pos].degre++);
		OPE1=0;
		OPE1_pos=0;
		SCORE+=1;
		
		if ((CALC[0].valeur == CST_TOFIND) && (CALC.length==1)) //Modified
		{
			CST_TOFIND ++;
			init();
			init_operation();
			showTable();

			showNumber();
			
			if (CST_TOFIND>=7) OPERATION.push(new Operation(13,"|x|",0));
			if (CST_TOFIND>=17) OPERATION.push(new Operation(14,"x²",0));
			if (CST_TOFIND>=103) OPERATION.push(new Operation(15,"!",0));
			if (CST_TOFIND>=182) OPERATION.push(new Operation(16,"x3",0));			
			if (CST_TOFIND>=813) OPERATION.push(new Operation(17,"x5",0));
			if (CST_TOFIND>=850) OPERATION.push(new Operation(18,"10x",0));
		
			
			showOperations();
			createCookie('1234',CST_TOFIND,7); //creer un cookie avec la valeur courante pour le chiffre a trouver pour 7 jours
			
		}
		else  showTable();
		
		
		//reshape();
		showTable();
		
		return true;
		}	


		if (valeur == 16) //cube
		{
		VALUE = Math.pow(OPE1,3);
		CALC[OPE1_pos]=new Brique(VALUE,CALC[OPE1_pos].degre++);
		OPE1=0;
		OPE1_pos=0;
		SCORE+=1;
		
		if ((CALC[0].valeur == CST_TOFIND) && (CALC.length==1)) //Modified
		{
			CST_TOFIND ++;
			init();
			init_operation();
			showTable();

			showNumber();
			
			if (CST_TOFIND>=7) OPERATION.push(new Operation(13,"|x|",0));
			if (CST_TOFIND>=17) OPERATION.push(new Operation(14,"x²",0));
			if (CST_TOFIND>=103) OPERATION.push(new Operation(15,"!",0));
			if (CST_TOFIND>=182) OPERATION.push(new Operation(16,"x3",0));
			if (CST_TOFIND>=813) OPERATION.push(new Operation(17,"x5",0));
			if (CST_TOFIND>=850) OPERATION.push(new Operation(18,"10x",0));
		
			
			showOperations();
			createCookie('1234',CST_TOFIND,7); //creer un cookie avec la valeur courante pour le chiffre a trouver pour 7 jours
			
		}
		else  showTable();
		
		
		//reshape();
		showTable();
		
		return true;
		}			

		if (valeur == 17) //puissance 5
		{
		VALUE = Math.pow(OPE1,5);
		CALC[OPE1_pos]=new Brique(VALUE,CALC[OPE1_pos].degre++);
		OPE1=0;
		OPE1_pos=0;
		SCORE+=1;
		
		if ((CALC[0].valeur == CST_TOFIND) && (CALC.length==1)) //Modified
		{
			CST_TOFIND ++;
			init();
			init_operation();
			showTable();

			showNumber();
			
			if (CST_TOFIND>=7) OPERATION.push(new Operation(13,"|x|",0));
			if (CST_TOFIND>=17) OPERATION.push(new Operation(14,"x²",0));
			if (CST_TOFIND>=103) OPERATION.push(new Operation(15,"!",0));
			if (CST_TOFIND>=182) OPERATION.push(new Operation(16,"x3",0));
			if (CST_TOFIND>=813) OPERATION.push(new Operation(17,"x5",0));
			if (CST_TOFIND>=850) OPERATION.push(new Operation(18,"10x",0));
			
			showOperations();
			createCookie('1234',CST_TOFIND,7); //creer un cookie avec la valeur courante pour le chiffre a trouver pour 7 jours
			
		}
		else  showTable();
		
		
		//reshape();
		showTable();
		
		return true;
		}			
		

		if (valeur == 18) // fois 10
		{
		VALUE = OPE1*10
		CALC[OPE1_pos]=new Brique(VALUE,CALC[OPE1_pos].degre++);
		OPE1=0;
		OPE1_pos=0;
		SCORE+=1;
		
		if ((CALC[0].valeur == CST_TOFIND) && (CALC.length==1)) //Modified
		{
			CST_TOFIND ++;
			init();
			init_operation();
			showTable();

			showNumber();
			
			if (CST_TOFIND>=7) OPERATION.push(new Operation(13,"|x|",0));
			if (CST_TOFIND>=17) OPERATION.push(new Operation(14,"x²",0));
			if (CST_TOFIND>=103) OPERATION.push(new Operation(15,"!",0));
			if (CST_TOFIND>=182) OPERATION.push(new Operation(16,"x3",0));
			if (CST_TOFIND>=813) OPERATION.push(new Operation(17,"x5",0));
			if (CST_TOFIND>=850) OPERATION.push(new Operation(18,"10x",0));
		
			
			showOperations();
			createCookie('1234',CST_TOFIND,7); //creer un cookie avec la valeur courante pour le chiffre a trouver pour 7 jours
			
		}
		else  showTable();
		
		
		//reshape();
		showTable();
		
		return true;
		}		


		
		
	
	}
	
	function factorielle(n)
		{
		if (n == 0) {
			return 1;
		}
		else {
		return n * factorielle (n-1);
		}
		} 
	
	function reshape()
	{
	var towrite="<table width='100%'><tr><td align='center'><tr>";
	var i=0;
	
	CALC[OPE1_pos]=new Brique(VALUE,CALC[OPE1_pos].degre++);
	CALC[OPE2_pos]=0;
	
	var CALCtmp=new Array();
	
	for (val in CALC){

		if (CALC[val]==0) continue;
		else
		{
		towrite+="<td id='tmp"+val+"'  style='border:1px solid black;background-color:white;color:blue;border-radius:10px;' width='"+Math.round(CALC.length*4/100-1) +"%'  align='center' onclick='this.style.color=\"orange\"; clickBrique("+CALC[val].valeur+","+i+");'><label style='font-family: Montserrat, sans-serif; font-size:100px;'>"+CALC[val].valeur+"</label></td>";
		CALCtmp[i]=new Brique(CALC[val].valeur,CALC[val].degre);
		i++;
		}
		
	}
	CALC=CALCtmp;
	CALCtmp = 0;

	VALUE=0;
	OPE1=0; OPE1_pos=0;
	OPE2=0; OPE2_pos=0;
    towrite+="</tr></table>";
	document.getElementById("tableau").innerHTML=towrite;
	
		
		if ((i==1) && (CALC[0].valeur == CST_TOFIND))
		{
			CST_TOFIND ++;
			init();
			init_operation();
			showTable();

			showNumber();
			
			if (CST_TOFIND>=7) OPERATION.push(new Operation(13,"|x|",0));
			if (CST_TOFIND>=17) OPERATION.push(new Operation(14,"x²",0));
			if (CST_TOFIND>=103) OPERATION.push(new Operation(15,"!",0));			
			if (CST_TOFIND>=182) OPERATION.push(new Operation(16,"x3",0));							
			if (CST_TOFIND>=813) OPERATION.push(new Operation(17,"x5",0));
			if (CST_TOFIND>=850) OPERATION.push(new Operation(18,"10x",0));
	
			showOperations();
			
			createCookie('1234',CST_TOFIND,7); //creer un cookie avec la valeur courante pour le chiffre a trouver pour 7 jours
			//createCookie('1234score',SCORE,7); //creer un cookie avec le score
			
		}
		else
			{
			/*if ((i==1)&&(CALC[0].valeur>=0))
			{
			document.getElementById("operation").innerHTML="<label style='font-family: Montserrat, sans-serif; font-size:200px;color:red'>FAIL !!<br> Refresh !</label><br><br><br>";
			}*/
			
			}

	showTable();
	 showScore()
	
	}
	
	
	function init()
	{
	
	CALC = [new Brique(1,0), new Brique(2,0), new Brique(3,0), new Brique(4,0)];

	}
	
	
	function init_operation()
	{
		OPERATION = [new Operation(10,"+",0), new Operation(11,"-",0), new Operation(12,'*',0)];

	}
	
	function showTable()
	{
	var towrite="<table cellspacing='20' width='100%'><tr><td align='center'><tr>";
	var i=0;
    console.log(CALC)
	for (val in CALC){
		towrite+="<td id='tmp"+val+"' style='border:1px solid black;background-color:white;color:blue;border-radius:10px;' width='25%' align='center' onclick='this.style.color=\"orange\" ; clickBrique("+CALC[val].valeur+","+i+");'><label style='font-family: Montserrat, sans-serif; font-size:100px;'>"+CALC[val].valeur+"</label></td>";
		i++;
	} 
	//GAGNE !
    towrite+="</tr></table>";
	document.getElementById("tableau").innerHTML=towrite;
	 showScore();
	}

	
	function showOperations()
	{
		var towrite="<table width='100%'><tr><td align='center'><tr>";
	for (val in OPERATION){
		if (OPERATION[val].valeur == 10) //+
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";
		if (OPERATION[val].valeur == 11) //-
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";
		if (OPERATION[val].valeur == 12) //*
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";
		
		if (OPERATION[val].valeur == 13) //|x|
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";
			
		if (OPERATION[val].valeur == 14) //x²
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";
			
		if (OPERATION[val].valeur == 15) //fact
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";

		if (OPERATION[val].valeur == 16) //x3
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";
			
		if (OPERATION[val].valeur ==17) //x5
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";

		if (OPERATION[val].valeur ==18) //10x
			towrite+="<td  width='"+Math.round(100/OPERATION.length) +"%' align='center' onclick=clickOperation("+OPERATION[val].valeur+");><label style='font-family: Montserrat, sans-serif; font-size:100px;color:green;'>"+OPERATION[val].text+"</label></td>";
			

	} 
    towrite+="</tr></table>";
	document.getElementById("operation").innerHTML=towrite;
	}

	function showNumber()
	{
	
		document.getElementById("to_find").innerHTML="<label style='font-family: Montserrat, sans-serif; font-size:150px;color:red'>"+CST_TOFIND+"</label><br><br><br>";

	}
	
	function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function showScore(){
	//document.getElementById("score").innerHTML="<label style='font-family: Montserrat, sans-serif; font-size:80px;color:purple'>SCORE: "+SCORE+"</label>";
}
	
	
	
function main_loop()
{


    // Get the current URL of the page
    const url = window.location.href;

    // Parse the URL
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    // Get the value of 'xyzt' parameter
    const xyztValue = params.get('xyzt');

    if (xyztValue !== null) {
        // console.log("Value of xyzt:", xyztValue);
      // You can do something with the value here
        
      CST_TOFIND=xyztValue;
      
    }



//Initialisation
if (CST_init == 0) {

                        if (xyztValue !== null){
                            CST_TOFIND=xyztValue;
                            createCookie('1234',xyztValue,7)

                        }
                        else{
						var x = readCookie('1234');
						//var y = readCookie('1234score');
						//if ((x==null)||(y==null))
						if ((x==null))
							{
							createCookie('1234',0,7); //creer un cookie avec la valeur 0 pour le chiffre a trouver pour 7 jours
							//createCookie('1234score',0,7);
							}
						else
							{
							CST_TOFIND=x;
                            // CST_TOFIND=813;
							//SCORE=y;
							}
                        
                        }

						init();
						init_operation();
						CST_init ++;
						showTable();
						if (CST_TOFIND>=7) OPERATION.push(new Operation(13,"|x|",0));
						if (CST_TOFIND>=17) OPERATION.push(new Operation(14,"x²",0));
						if (CST_TOFIND>=103) OPERATION.push(new Operation(15,"!",0));						
						if (CST_TOFIND>=182) OPERATION.push(new Operation(16,"x3",0));												
                        if (CST_TOFIND>=813) OPERATION.push(new Operation(17,"x5",0));		
						if (CST_TOFIND>=850) OPERATION.push(new Operation(18,"10x",0));

						showOperations();
						showNumber();
					}




//setTimeout('main_loop();',0.005);
return true;
}
