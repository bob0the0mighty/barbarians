/*
MAP CREATOR ICON ANNOTATION

Obstacles:
x = lonely mountain
I = start (Left) of horizontal mountain range
X = mountain range center
D = end (Right) of horizontal mountain range
V = vegetation

' ' = empty cell

Units:
N = neutral town
A = roman town
E = barbarian town
n = neutral creature (wolfs)
a = roman soldier
e = barbarian soldier


OTHERS (NOT IMPLEMENTED YET)

'-' = road
'S' = river
'=' = bridge
'[' = wall

*/

//maps 8x8 (64 cells), 10 maps y 1 template
var blueprints = [
[
	"        ",
	"        ",
    "        ",
    "        ",
    "        ",
    "        ",
    "        ",
    "        "
],

[
	"ID n  ID",
	"xA    Nx",
    "x     ID",
    "  aID   ",
    "    xe  ",
    "ID     x",
    "xN    Ex",
    "IXD  nID"
],

[
	"ID IXXXD",
	"x IXXD x",
    "ID AN ID",
    "ID a aID",
    "IDe e ID",
    "ID eE ID",
    "xE ID  x",
    "IXXXDeID"
],

[
	"IXD IXXD",
	"xaaaaaax",
    "x      x",
    "x      x",
    "x   N  x",
    "xe E  ex",
    "x ee e x",
    "IXXDeIXD"
],

[
	"ID IXXXD",
	"xAa    x",
    "IXXXDN x",
    "xNn    x",
    "x    nNx",
    "x EIXXXD",
    "x     Ex",
    "IXXXXXXD"
],

[
	"xeee VID",
	"V e e eV",
    " e    e ",
    " V AA  n",
    "   aa   ",
    " e    e ",
    " ee  e n",
    "n Ve eeV"
],

[
	"IXXXXXXD",
	"x E V   ",
    "x  eV Ax",
    "x E N ax",
    "x  e  ax",
    "x E V Ax",
    "x e V   ",
    "IXXXXXXD"
],

[
	"V     AV",
	"  VE   V",
    "       n",
    "n n   V ",
    " nVVVNnn",
    "       n",
    "N a     ",
    "VVV VE V"
],

[
	"IXDN IXD",
	"ID   e x",
    "x  A  Ex",
    "xaIXD ID",
    "x x   Ex",
    "x x N  x",
    "xe ex Ex",
    "IDNIXXXD"
],

[
	"V  a   n",
	" N   nV ",
    "    nNn ",
    "VVVV    ",
    "  n eeE ",
    "x   E e ",
    "IDn eeE ",
    "IXD    V"
],

[
	"IXXXXXDn",
	"xe EEVID",
    "x e ee x",
    "nVe   ee",
    "V      V",
    "aaaaaaaa",
    "a  aa  a",
    "aaaaaaaa"
],

];

// You can set here a different starting level, for testing purposes
var currentMapLevel = 1,
    units = [];
//Gold [Romans, Barbarians];
    gold = [1, 1];

$(document).ready(ini);

function ini() {
	//console.log(randomMapGenerator(10, 2, 2, 3, 5, 5, 5));
    /////////randomMapGenerator(x, A, E, N, a, e, n)///////
    //mapGenerator(randomMapGenerator(10, 2, 2, 3, 2, 3, 2)); // <= 64
    //currentMapLevel = 7;
    
    mapGenerator(blueprints[currentMapLevel]);

    $('#close').click(function(){
        $('.cell').off();
        $('.icon').off();
        $('.icon').click(showIconData);
        $('#info').hide();
    });

    $('#reset_map').click(function(){
        if (confirm('Reset current map?')){
            mapGenerator(blueprints[currentMapLevel]);
        }
    });

    $('#end_turn').click(endTurn);
}

// Generates a map using the desing array as input
function mapGenerator(array){
    const array_length = array.length,
          iconTagClosing = '.png"></img>',
          neutralIconTitle = 'Hungry wolfs';
    
	let i = 0,
        j = 0,
        cell = '',
        icon = ' ',
        backgroundColor = '',
        iconColor = '',
        iconShape = '',
        display = '',
        ground = 'H_def.png';

    document.getElementById("music-bar").pause();
    
    units = [];
    gold = [1, 1];
    
    $('#gold').val(gold[0]);
    $('#info').hide();
    $('#map').html('');
    
    for (i = 0; i < array_length; i++){

        $('#map').append('<tr id="row' + i + '"></tr>');

        row_length = array[i].length;
        for (j = 0; j < row_length; j++){

            cell = array[i].charAt(j);
            icon = '<img id="icon'+i+''+j+cell+'" src="images/';

            switch(cell){

                case ' ':
                    display = 'none';
                    cell = '_';
                    icon = '';
                    break;
                    
                case 'x':
                    display = 'none';
                    cell = 'x';
                    icon += 'MS_def' + iconTagClosing;
                    display = 'block';
                    break;
                    
                case 'I':
                    display = 'none';
                    cell = 'x';
                    icon += 'MI_defl' + iconTagClosing;
                    display = 'block';
                    break;
                    
                case 'X':
                    display = 'none';
                    cell = 'x';
                    icon += 'M_def' + iconTagClosing;
                    display = 'block';
                    break;
                    
                case 'D':
                    display = 'none';
                    cell = 'x';
                    icon += 'MD_def' + iconTagClosing;
                    display = 'block';
                    break;
                    
                case 'V':
                    display = 'none';
                    cell = 'x';
                    icon += 'A_def' + iconTagClosing;
                    display = 'block';
                    break;

                case 'N':
                    iconShape = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Neutral', tipo: 'Town', name: 'Libre', stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="Free Town"><img class="icon" id="icon'+i+''+j+cell+'" src="images/AN_del_def.png"></img></a>';
                    break;
                    
                case 'A':
                    iconShape = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Roman', tipo: 'Town', name: getRandomName('Town', 'Roman'), stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. Cantidad: [1], Calidad: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/AR_del_def.png"></img></a>';
                    break;
                    
                case 'E':
                    iconShape = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Barbarian', tipo: 'Town', name: getRandomName('Town', 'Barbarian'), stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/AB_del_def.png"></img></a>';
                    break;
                    
                case 'n':
                    backgroundColor = 'Green';
                    iconColor = 'Grey';
                    iconShape = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Neutral', tipo: 'Manada', name: 'Lobos', mueve_total: 0, mueve: 0, strength: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="' + neutralIconTitle + '">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/L_del_def.png"></img></a>';
                    break;
                    
                case 'a':
                    backgroundColor = 'Green';
                    iconColor = 'Blue';
                    iconShape = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Roman', tipo: 'Soldier', name: getRandomName('Soldier', 'Roman'), mueve_total: 2, mueve: 2, strength: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. Mueve: [2], strength: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/SR_del_def.png"></img></a>';
                    break;
                    
                case 'e':
                    color = 'Green';
                    backgroundColor = 'Green';
                    iconColor = 'Red';
                    iconShape = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Barbarian', tipo: 'Soldier', name: getRandomName('Soldier', 'Barbarian'), mueve_total: 1, mueve: 1, strength: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. Mueve: [1]. strength: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/SB_del_def.png"></img></a>';
                    break;

                default:
                    icon = '';
                    display = 'none';
                    cell = '_';
                    break;
            }

            $('#row' + i).append('<th class="cell" id="cell' + i + '' + j + '">' + icon + '</th>');

            $('#cell' + i + '' + j).css({'background-image': 'url(images/' + ground + ')'});
            $('#icon' + i + j + cell).css({'display' : display});
        }
    }

    $('.icon').click(showIconData);
}

// ON DEVELOPMENT
// Randomly generates a map using arguments (shall sum 64)
function randomMapGenerator(x, A, E, N, a, e, n){
    var planes = [
        {tipo: 'x', num: x}, 
        {tipo: 'A', num: A}, 
        {tipo: 'E', num: E}, 
        {tipo: 'N', num: N}, 
        {tipo: 'a', num: a}, 
        {tipo: 'e', num: e}, 
        {tipo: 'n', num: n}
    ];

    var total = planes[0].num + planes[1].num + planes[2].num + planes[3].num + planes[4].num + planes[5].num + planes[6].num;
    var blueprint = blueprints[0];
    var i = 0;
    var j = 0;
    var columnas = blueprint.length;
    var filas = blueprint[0].length;
    var plan_random = '';

    while (total > 0){

        for (i = 0; (i < columnas && total > 0) ; i++){

            for (j = 0; (j < filas && total > 0) ; j++){

                plan_random = Math.floor((Math.random() * planes.length));

                if ( (planes[plan_random].num > 0) && comprobarIncompatibilidad(i, j, planes[plan_random].tipo, blueprint) ){;
                    blueprint[i] = blueprint[i].replaceAt(j, planes[plan_random].tipo);
                    planes[plan_random].num--;
                    total--;
                }
            }
        }
    }

    return blueprint;
}

// ON DEVELOPMENT
// Checks that colindant cells there aren't any incompatible units with the new unit we are placing
function comprobarIncompatibilidad(i, j, tipo, blueprint){
    var k = 0;
    var incompatibles;
    var alwaysCompatible = false;
    var iteration = [
        [i+1,j], [i-1,j], [i,j+1], [i,j-1]
    ];

    //var iterationLength = iteration.length;

    for (k = 0; k < iteration.length; k++){

        if (iteration[k][0] < 0 || iteration[k][1] < 0){
            iteration.splice(k, 1);
        }
    }

    var iterationLength = iteration.length;

    // 1 or 2 types are incompatibles, we repeat two times to simplify the algorythm
    switch(tipo){
        case 'A':
            incompatibles = ['e', 'e', 'e'];
            break;
        case 'E':
            incompatibles = ['a', 'a', 'a'];
            break;
        case 'N':
            incompatibles = ['a', 'e', 'e'];
            break;
        case 'a':
            incompatibles = ['E', 'e', 'n'];
            break;
        case 'e':
            incompatibles = ['A', 'a', 'n'];
            break;
        default:
            alwaysCompatible = true;
            break;
    }

    if (!alwaysCompatible){

        for (k = 0; k < iteration.length; k++){

            if ( (blueprint[iteration[k][0]].charAt(iteration[k][1]) === incompatibles[0])
            || (blueprint[iteration[k][0]].charAt(iteration[k][1]) === incompatibles[1])
            || (blueprint[iteration[k][0]].charAt(iteration[k][1]) === incompatibles[2])
            ){
                return false;
            }
        }
    }
    return true;
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


// NAMES
const romanSoldierNames = [
                    'Nerón', 'Victis', 'Caesar', 'Platón', 'Sócrates', 'Aristóteles', 'Augusto', 'Aquiles', 'Ulises', 'Agamenón', 'Arkantos', 'Ajax',
                    'Homero', 'Dante', 'Zeus', 'Helena', 'Apollo', 'Atenea', 'Minerva', 'Fausto', 'Hades', 'Poseidón', 'Júpiter', 'Venus', 'Mercurio',
                    'Galileo', 'Vinci', 'Invictus', 'Titán', 'Atlas', 'Gea', 'Gaia', 'Saturno', 'Urano', 'Dionisio', 'Ares', 'Kratos',
                    'Gaius', 'Lucius', 'Marcus', 'Publius', , 'Quintus', 'Quinta', 'Tidus', 'Tiberius', 'Aulus', 'Spurius', 'Manius', 'Servius', 'Appius', 'Vibius',
                    'Agrippa', 'Aquilinius', 'Balbus', 'Barbatus', 'Cicerón', 'Cilo', 'Corvus', 'Corpus', 'Lapidus', 'Mergus', 'Regulus', 'Scipio', 'Severus', 'Triarius', 'Aureus',
                    'Auron', 'Yuna', 'Riku', 'Niku', 'Wolfwood', 'Nicholas', 'Cibeles',
                    'Aura', 'Austro', 'Asclepio', 'Baco', 'Cupido', 'Legolas', 'Aragorn', 'Diana', 'Libertas', 'Laverna', 'Liber',
                    'Fornax', 'Eón', 'Fauno', 'Osiris', 'Nemauso', 'Egestas', 'Tellus', 'Timor', 'Quirino', 'Proserpina', 'Pax',
                    'Vesta', 'Virtus', 'Volumna', 'Vulturno', 'Europa', 'Pandora', 'Efreet', 'Nova', 'Artemis', 'Bahamut', 'Deux Ex', 'Oraculo', 'El Gran Héroe', 'Rey de los Judios',
                    'Einstein', 'Madara', 'Mandala', 'Rem', 'Alejandro', 'Django', 'Shiva', 'Ánima',
                    'Gabo', 'Jordi','Juanju', 'Iván', 'Marga', 'Nacho',

                    'Nerón', 'Victis', 'Caesar', 'Platón', 'Sócrates', 'Aristóteles', 'Augusto', 'Aquiles', 'Ulises', 'Agamenón', 'Arkantos', 'Ajax',
                    'Homero', 'Dante', 'Zeus', 'Helena', 'Apollo', 'Atenea', 'Minerva', 'Fausto', 'Hades', 'Poseidón', 'Júpiter', 'Venus', 'Mercurio',
                    'Galileo', 'Vinci', 'Invictus', 'Titán', 'Atlas', 'Gea', 'Gaia', 'Saturno', 'Urano', 'Dionisio', 'Ares', 'Kratos',
                    'Gaius', 'Lucius', 'Marcus', 'Publius', , 'Quintus', 'Quinta', 'Tidus', 'Tiberius', 'Aulus', 'Spurius', 'Manius', 'Servius', 'Appius', 'Vibius',
                    'Agrippa', 'Aquilinius', 'Balbus', 'Barbatus', 'Cicerón', 'Cilo', 'Corvus', 'Corpus', 'Lapidus', 'Mergus', 'Regulus', 'Scipio', 'Severus', 'Triarius', 'Aureus',
                    'Auron', 'Yuna', 'Riku', 'Niku', 'Wolfwood', 'Nicholas', 'Cibeles',
                    'Aura', 'Austro', 'Asclepio', 'Baco', 'Cupido', 'Legolas', 'Aragorn', 'Diana', 'Libertas', 'Laverna', 'Liber',
                    'Fornax', 'Eón', 'Fauno', 'Osiris', 'Nemauso', 'Egestas', 'Tellus', 'Timor', 'Quirino', 'Proserpina', 'Pax',
                    'Vesta', 'Virtus', 'Volumna', 'Vulturno', 'Europa', 'Pandora', 'Efreet', 'Nova', 'Artemis', 'Bahamut', 'Deux Ex', 'Oraculo', 'El Gran Héroe', 'Rey de los Judios',
                    'Einstein', 'Madara', 'Mandala', 'Rem', 'Alejandro', 'Django', 'Shiva', 'Ánima',
                    'Gabo', 'Jordi','Juanju', 'Iván', 'Marga', 'Nacho'
                ],

      barbarianSoldierNames = [
                    'El Decapitador', 'El DejaViudas', 'El Psicópata', 'Perro Loco', 'Jacobo PechoLobo', 'Champ', 'Chemp', 'Chomp', 'El SajaPerros', 'El ViolaCabras', 'Oso Sin Pelo',
                    'Verganmitorix', 'Harrak el Desmembrador', 'Conan el Bárbaro', 'Thormund', 'Jormungard', 'Fenrir', 'Gullinbursti', 'Bruto', 'CabezaYunke', 'Empalador', 'Bárbara',
                    'Zaratustra', 'CaraCulo', 'Calavera', 'Cráneo', 'Apestoso', 'Max', 'Stomp', 'Stamp', 'CuernoRoto', 'Ano', 'Ulf', 'Udolf', 'Alf', 'Olf', 'HachaGrande', 'LanzaRota',
                    'MataReyes', 'Destructor', 'Abrasador', 'Ensartador', 'Arpía', 'El Gordo', 'BarrilViejo', 'Melody',
                    'Ásterix', 'Obelix', 'Abraracourcix', 'Homeopatix', 'Amerix', 'Amnesix', 'Eponine', 'Odalix', 'Vascongalo', 'Alambix',
                    'Panoramix', 'Karabella', 'Ideafix', 'Franco', 'Anglo', 'Sajón', 'Lombardo', 'CabezaHuevo',
                    'Alberick', 'Alrik', 'Algot', 'Asmund', 'Gunvor', 'Grevor', 'Hallmar', 'Humla', 'Inge', 'Ingo', 'Ingred', 'Maj',
                    'Lunt', 'Leif', 'Majken', 'Lynae', 'Rin', 'Vidhr', 'Ylwa', 'Ursa', 'Yorick', 'Winka', 'Wanka', 'Trygg', 'Masturbatix',
                    'Tove', 'Torborg', 'Thour', 'Thurston', 'Valkyrie', 'Alina', 'Dash La Estampida', 'Trin La Tormenta', 'Odín', 'El Segador', 'Thor', 'Leviatán', 'Brunilda',

                    'El Decapitador', 'El DejaViudas', 'El Psicópata', 'Perro Loco', 'Jacobo PechoLobo', 'Champ', 'Chemp', 'Chomp', 'El SajaPerros', 'El ViolaCabras', 'Oso Sin Pelo',
                    'Verganmitorix', 'Harrak el Desmembrador', 'Conan el Bárbaro', 'Thormund', 'Jormungard', 'Fenrir', 'Gullinbursti', 'Bruto', 'CabezaYunke', 'Empalador', 'Bárbara',
                    'Zaratustra', 'CaraCulo', 'Calavera', 'Cráneo', 'Apestoso', 'Max', 'Stomp', 'Stamp', 'CuernoRoto', 'Ano', 'Ulf', 'Udolf', 'Alf', 'Olf', 'HachaGrande', 'LanzaRota',
                    'MataReyes', 'Destructor', 'Abrasador', 'Ensartador', 'Arpía', 'El Gordo', 'BarrilViejo', 'Melody',
                    'Ásterix', 'Obelix', 'Abraracourcix', 'Homeopatix', 'Amerix', 'Amnesix', 'Eponine', 'Odalix', 'Vascongalo', 'Alambix',
                    'Panoramix', 'Karabella', 'Ideafix', 'Franco', 'Anglo', 'Sajón', 'Lombardo', 'CabezaHuevo',
                    'Alberick', 'Alrik', 'Algot', 'Asmund', 'Gunvor', 'Grevor', 'Hallmar', 'Humla', 'Inge', 'Ingo', 'Ingred', 'Maj',
                    'Lunt', 'Leif', 'Majken', 'Lynae', 'Rin', 'Vidhr', 'Ylwa', 'Ursa', 'Yorick', 'Winka', 'Wanka', 'Trygg', 'Masturbatix',
                    'Tove', 'Torborg', 'Thour', 'Thurston', 'Valkyrie', 'Alina', 'Dash La Estampida', 'Trin La Tormenta', 'Odín', 'El Segador', 'Thor', 'Leviatán', 'Brunilda',
                ],

    romanTownNames = [
                'Roma', 'Polentia', 'Tracia', 'Hispalis', 'Gades', 'Atenas', 'Tiberia', 'Publia',
                'Londinium', 'Agrippina', 'Burgidala', 'Salmantica', 'Tarraco', 'Babel', 'Tingis', 'Tomis', 'Salona', 'Naissus', 'Ancyra', 'Artaxarta',
                'Caesarea', 'Nisibis', 'Tarsus', 'Salamis', 'Bostra', 'Cyrene', 'Alexandria',
                'Zanarkand', 'Ciudad de Paso',
                'Palma', 'Buenos Aires', 'Sa Cabaneta', 'Son Ferriol', 'Banyalbufar', 'Manacor', 'Corrubedo'
                ],

      barbarianTownNames = [
                    'Tótems', 'VillaLobos', 'Aldea de la Peste', 'Tambor de Piel', 'Campamento de Caza', 'Guarida de Incursores', 'Jotunheim', 'Iggdrassil',
                    'Galia', 'Ostrogodia', 'Cartago', 'Aldea de los Hunos', 'Aldea de los Godos', 'Campamento Franco', 'Pueblo Sajón', 'Tierras de Vándalos',
                    'Campamento de Ostrogodos', 'Tungri', 'Treveri', 'Marsi', 'Camavi', 'Frisonia', 'Usupeti', 'Cherusci', 'Sicambrii', 'Catii', 'Suebi', 'Turones',
                    'Angli', 'Varni', 'Angrivarii', 'Cauces', 'Saxones', 'Sexonia', 'Lemovii', 'Rugii', 'Gothi', 'Vandali', 'Bastarni',
                    'Burgundii', 'Buri', 'Quadi',
                    'Pueblo Paleto', 'Son Banya', 'Gotham', 'Son Gotleu', 'Son Roca'
                ];

//////////////////////////////////////////////////


// Returns a name string, chosen randomly from the names array 
function getRandomName(tipo, bando){
    let names, randomNumber;

    switch(tipo){

        case 'Soldier':
            names = bando === 'Roman' ? 
                romanSoldierNames : barbarianSoldierNames;

            break;
            
        case 'Town':
            names = bando === 'Roman' ? 
                romanTownNames : barbarianTownNames;
            
            break;
    }

    randomNumber = Math.floor(Math.random() * (names.length - 1));
    names.splice(randomNumber, 1);

    return names[randomNumber];
}

// End current player turn, and provides 3 gold to each player
function endTurn(){
    const unitsLength = units.length;
    
    let i = 0,
        id = '',
        unit_i;

    generateSoldiers('Roman');
    turnoIA();
    generateSoldiers('Barbarian');
    gold[1] += 3;
    gold[0] += 3;
    $('#gold').val(gold[0]);

    for (i = 0; i < unitsLength; i++){

        unit_i = units[i];

        // Soldiers will capture adjacent towns automatically if they are besides them at the end of turn
        checkEncounter(unit_i);

        if (unit_i.tipo === 'Soldier'){
            unit_i.mueve = unit_i.mueve_total;

            // If it's a Roman Soldier, colour it in order to indicate that it can move again 
            if (unit_i.jugador === 'Roman'){
                id = $('#'+unit_i.cell).attr('id').replace('icon', '').split("");
                
                $('#cell' + id[0] + id[1]).html('<a id="tooltip' + id[0] + id[1]
                    +'a" href="#" data-toggle="tooltip" title="['+unit_i.name+']. Moves: ['+unit_i.mueve+'], Strength: ['+unit_i.strength+']">'
                        +'<img class="icon" id="icon'+id[0]+id[1]+'a" src="images/SR_del_def.png"></img></a>');
            }
        }
    }

    $('.icon').off();
    $('.icon').click(showIconData);

    checkVictoryCondition();
}

// Performs the AI enemy turn: it behaves quite randomly for now
function turnoIA(){
    var i = 0;
    var towns = [];
    var num_iter = 0;
    var iguales = true;
    var auxTown = '';

    var towns_length = '';
    var unitsLength = units.length;
    var vago = 0;

    // Move soldiers
    for (i = 0; i < unitsLength; i++){

        // If random number is 1, soldier will not move this turn
        vago = Math.round(Math.random() * 5);

        if ( (units[i] !== undefined) && (units[i].tipo === 'Soldier') && (units[i].jugador === 'Barbarian') && (vago != 1) ){
            automoveSoldierRandom(units[i]);
        }
    }

    // Create only towns array
    for (i = 0; i < units.length; i++){

        if ((units[i].tipo === 'Town') && (units[i].jugador === 'Barbarian')){
            towns.push(units[i]);
        }
    }

    // Randonmy reorder towns array
    num_iter = Math.round(Math.random() * towns_length);

    while (num_iter > 0){

        while (iguales){
            iguales = false;
            randomTown1 = Math.round(Math.random() * towns_length) - 1;
            randomTown2 = Math.round(Math.random() * towns_length) - 1;
            if (randomTown1 === randomTown2){
                iguales = true;
            }
        }

        auxTown = towns[randomTown1];
        towns[randomTown1] = towns[randomTown2];
        towns[randomTown2] = auxTown;

        num_iter--;
    }

    towns_length = towns.length;

    // Improve towns 
    for (i = 0; i < towns_length; i++){

        // If random number is 1, quality won't be improved; if it's 2, quantity won't be improved
        vago = Math.round(Math.random() * 5);

        if ((gold[1] >= towns[i].stats.precio_mej_cal) && (vago !== 1)){
            upgradeMode(towns[i], 'mej_cal');
        }

        if ((gold[1] >= towns[i].stats.precio_mej_cant) && (vago !== 2)){
            upgradeMode(towns[i], 'mej_cant');
        }
    }
}

// Move enemy soldiers randomly
function automoveSoldierRandom(unit){
    var randomIndex = 0;
    var cell_random = '';
    var iguales = true;
    var cell_aux = '';

    var cell = unit.cell.replace('icon', '').split("");

    var iteration = [
        ('cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
        ('cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
    ];

    // Avoid soldiers moving to non-existant cells
    if (parseInt(cell[0]) === 7){
        iteration.splice(0, 1);
    }else if (parseInt(cell[0]) === 0){
        iteration.splice(2, 1);
    }

    if (parseInt(cell[1]) === 7){
        iteration.splice(1, 1);
    }else if (parseInt(cell[1]) === 0){
        iteration.splice(3, 1);
    }

    var iterationLength = iteration.length;

    // Randomly reorder posible directions array
    num_iter = Math.round(Math.random() * iterationLength);

    while (num_iter > 0){

        while (iguales){

            iguales = false;
            cell_random1 = Math.abs(Math.round(Math.random() * (iteration.length - 1)))
            cell_random2 = Math.abs(Math.round(Math.random() * (iteration.length - 1)))
            if (cell_random1 == cell_random2){
                iguales = true;
            }
        }

        cell_aux = iteration[cell_random1];
        iteration[cell_random1] = iteration[cell_random2];
        iteration[cell_random2] = cell_aux;

        num_iter--;
    }

    var movs = unit.mueve;

    while ((unit.mueve === movs) && (iteration.length > 0)){

        randomIndex = Math.abs(Math.round(Math.random() * (iteration.length - 1))) ;
        cell_random = iteration[randomIndex];
        moveSoldier(unit, cell_random);
        iteration.splice(randomIndex, 1);
    }
}

// Move soldiers, first try to aproach neutral/human player towns, and then human player soldiers
function automoveSoldierIA(unit){
    var randomIndex = 0;
    var cell_random = '';
    var iguales = true;
    var cell_aux = '';
    var i = 0;
    var initialCell = '';
    var finalCell = '';
    var objetivo = '';
    var continuar = true;

    var cell = unit.cell.replace('icon', '').split("");

    var iteration = [
        ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1]) +' a img'), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1) +' a img'),
        ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1]) +' a img'), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1) +' a img')
    ];

    var iterationLength = iteration.length;
    var unitsLength = units.length;

    initialCell = unit.cell.replace('icon','').split('');

    // First look for towns
    for (i = 0; (i < unitsLength && movs > 0); i++){

        continuar = true;

        if ((units[i].tipo === 'Town') && ((units[i].jugador === 'Neutral') || (units[i].jugador === 'Roman'))){

            while (continuar && unit.mueve > 0){
                objetivo = units[i];
                finalCell = units[i].cell.replace('icon','').split('');

                //It will try to position itself on the same column that the target; and after that, on the same row.
                if (initialCell[1] < finalCell[1]){
                    moveSoldier(unit, iteration[1]);
                }if (initialCell[1] < finalCell[1]){
                    moveSoldier(unit, iteration[4]);
                }else if (initialCell[0] < finalCell[0]){
                    moveSoldier(unit, iteration[0]);
                }else if (initialCell[0] > finalCell[0]){
                    moveSoldier(unit, iteration[2]);
                }

                // If our unit doesn't exist anymore o the town was already conquered, stop
                if ( (units[i].jugador === 'Roman') || (unit === undefined) ){
                    continuar = false;
                }
            }
        }
    }

    // Then it searchs for human and neutral soldiers
    for (i = 0; i < unitsLength; i++){

        continuar = true;

        if ((units[i].tipo === 'Soldier') && ((units[i].jugador === 'Neutral') || (units[i].jugador === 'Roman'))){

            while (continuar && unit.mueve > 0){
                objetivo = units[i];
                finalCell = units[i].cell.replace('icon','').split('');

                //Intentará posicionarse en la misma columna que el objetivo, y luego en su misma fila
                if (initialCell[1] < finalCell[1]){
                    moveSoldier(unit, iteration[1]);
                }if (initialCell[1] < finalCell[1]){
                    moveSoldier(unit, iteration[4]);
                }else if (initialCell[0] < finalCell[0]){
                    moveSoldier(unit, iteration[0]);
                }else if (initialCell[0] > finalCell[0]){f
                    moveSoldier(unit, iteration[2]);
                }

                // If our unit or human player unit doesn't exist anymore
                if ( (units[i] !== objetivo) || (unit === undefined) ){
                    continuar = false;
                }
            }
        }
    }
}

// Iterates through towns array and, if possible, generate soldiers equals to the quantity variable; with strength equals to quality variable
function generateSoldiers(jugador){
    var i = 0;
    var j = 0;
    var unitsLength = units.length;
    var soldiers = 0;
    var calidad = 0;
    var movs = 0;
    var cell = '';
    var cell_vacia = '';
    var id = '';
    var randomName = '';

    var iteration = '';
    var iterationLength = '';

    for(i = 0; i < unitsLength; i++ ){

        if ((units[i].tipo === 'Town') && (units[i].jugador === jugador)){

            soldiers = units[i].stats.cantidad;
            calidad = units[i].stats.calidad;

            cell = units[i].cell.replace('icon','').split("");

            iteration = [
                ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
                ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
            ];

            // Stop soldiers moving to non-existant cells
            if (parseInt(cell[0]) === 7){
                iteration.splice(0, 1);
            }else if (parseInt(cell[0]) === 0){
                iteration.splice(2, 1);
            }

            if (parseInt(cell[1]) === 7){
                iteration.splice(1, 1);
            }else if (parseInt(cell[1]) === 0){
                iteration.splice(3, 1);
            }

            iterationLength = iteration.length;


            //Will generate soldiers while free cells and dependant of quantity var of town 
            for (j = 0; (j < iterationLength) && (soldiers > 0); j++){

                if ( ($(iteration[j]+' img').attr('id') === undefined ) ){

                    cell_vacia = iteration[j].replace('#cell','').split("");

                    randomName = getRandomName('Soldier', jugador);

                    if (jugador === 'Roman'){
                        id = 'icon'+cell_vacia[0]+cell_vacia[1]+'a';
                        movs = 2;

                        $(iteration[j]).html('<a id="tooltip'+i+''+j+cell
                        +'" href="#" data-toggle="tooltip" title="['+randomName+']. Mueve: ['+movs+'], strength: ['+units[i].stats.calidad+']">'
                        +'<img class="icon" id="'+id+'" src="images/SR_del_def.png"></img></a>');

                    }else if (jugador === 'Barbarian'){
                        id = 'icon'+cell_vacia[0]+cell_vacia[1]+'e';

                        movs = 1;

                        $(iteration[j]).html('<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+randomName+']. Mueve: ['+movs+'], strength: ['+units[i].stats.calidad+']">'
                        +'<img class="icon" id="'+id+'" src="images/SB_del_def.png"></img></a>');
                    }

                    units.push(
                        {cell: id, jugador: jugador, tipo: 'Soldier', name: randomName, mueve: movs, mueve_total: movs, strength: calidad});

                    // Resolve possible encounters when this unit appears besides other enemy unit
                    checkEncounter(units[units.length - 1]);

                    soldiers--;
                }
            }
        }
    }
}

function updateDataLabels(unit) {
    $('#player').val(unit.jugador);
    $('#type').val(unit.tipo);
    $('#name').val(unit.name);
};

// Shows data about the icon and, depending of the type of icon, allows to move it (soldier) or improve it (town)
function showIconData(){
    let i = 0,
        unit,
        icon = this.id,
        tipo = icon.charAt(icon.length - 1),
        color,
        grey = 'RGB(135, 135, 135)',
        red = 'RGB(255, 10, 10)',
        blue = 'RGB(7, 168, 226)',
        unitsLength = units.length;

    $('.icon').off();

    for(i = 0; i < unitsLength; i++){
        if (units[i].cell == icon){
            unit = units[i];
            break;
        }
    }

    switch(tipo){

        case 'A':
            updateDataLabels(unit);

            $('#prod_cant').html(unit.cantidad);
            $('#prod_cal').html(unit.calidad);
            $('#mej_cant').html(unit.precio_mej_cant);
            $('#mej_cal').html(unit.precio_mej_cal);

            $('#town_info').show();
            $('#soldier_info').hide();

            $('#mej_cant').off();
            $('#mej_cant').click(function(){
                upgradeMode(unit, 'mej_cant');
            });

            $('#mej_cal').off();
            $('#mej_cal').click(function(){
                upgradeMode(unit, 'mej_cal');
            });

            //$('#mej_cal').click({unit : unit}, upgradeMode);

            $("#mej_cant").html('Quantity ('+unit.stats.precio_mej_cant+' Gold)');
            $("#mej_cal").html('Quality ('+unit.stats.precio_mej_cal+' Gold)');
            $("#prod").html('Producing ['+unit.stats.cantidad+'] soldiers with ['+unit.stats.calidad+'] strength each turn. Upgrade: ');

            color = 'red';
            break;

        case 'E':
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').hide();

            color = blue;
            break;

        case 'N':
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').hide();

            color = grey;
            break;

        case 'a':
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').show();

            modoMover(icon, unit);
            $("#movement").html('Movements left: [' + unit.mueve + ']');
            $("#strength").html('Combat strength: [' + unit.strength + '].');

            color = red;
            break;

        case 'e':
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').hide();

            $("#movement").html('');
            $("#strength").html('Combat strength: [' + unit.strength + '].');

            color = blue;
            break;

        case 'n':
            const move_message_eng = 'They protect their territory',
                  move_message_spa = 'Prefiere defender su territorio',
                  strength_message_eng = 'Can devour an undertrained human',
                  strength_message_spa = 'Puede devorar a alguien con poco entrenamiento';
            
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').hide();

            $("#movement").html(move_message_eng);
            $("#strength").html(strength_message_eng);

            color = grey;
            break;
    }

    $('#info').css({'background' : color});
    $('#info').show();
}

// Allows soldier to move while movements left
function modoMover(icon, unit){
    let target;
    //movs = unit.mueve;

    //$('#'+icon).html('<form><input readonly>'+movs+'</input></form>');

    $('.cell').off();
    //movs = movs - $('.cell').click({unit: unit}, moveSoldier).data("result");

    $('.cell').click(function(){
        var target = this.id;
        if ((unit.mueve > 0) && (unit.cell.replace('icon', '').substring(0, 2) !== this.id.replace('cell', ''))){
            moveSoldier(unit, target);
        }

    });

    $('#destroy').off();
    $('#destroy').click(function(){
        if (confirm('Do you want to destroy current soldier?')){
            destroyUnit(unit);
            $('.cell').off();
            $('#info').hide();
            $('.icon').off();
            $('.icon').click(showIconData);
        }
    });
}

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
function moveSoldier(unit, target) {
    let icon = document.getElementById(target).lastElementChild,
        movement,
        result;

    initialCell = unit.cell.replace('icon', '').split("");
    finalCell = target.replace('cell', '').replace('#', '').split("");
    
    //Check how many cells have it move as a total
    movement = Math.abs(initialCell[0] - finalCell[0]) + Math.abs(finalCell[1] - initialCell[1]);

    if ((icon === null) && (movement > 0) && (movement <= unit.mueve)
        /*
        && ((initialCell[0] - finalCell[0] < unit.mueve) || (finalCell[0] - initialCell[0] < unit.mueve))
        && ((initialCell[1] - finalCell[1] < unit.mueve) || (finalCell[1] - initialCell[1] < unit.mueve))
        */
        ){

        //Move the soldier icon to he selected cell, and calculate movements left 

        //$(unit.cell).css({'background': iconColor, 'border-radius' : iconShape, 'display' : display});
        //unit.cell = 'icon'+initialCell[2];

        unit.cell = 'icon' + finalCell[0] + '' + finalCell[1] + initialCell[2];

        result = checkEncounter(unit);

        unit.mueve = (result !== 'none') ? 0 : unit.mueve - movement;

        switch (unit.jugador) {
            case 'Roman':
                if (result === 'looses'){
                    $('#cell' + finalCell[0] + '' + finalCell[1]).html('');
                    
                }else if ((result === 'wins') || (unit.mueve === 0)){
                    $('#cell'+finalCell[0]+''+finalCell[1]).html('<a id="tooltip'+finalCell[0]+''+finalCell[1]+initialCell[2]
                        +'" href="#" data-toggle="tooltip" title="['+unit.name+']. Mueve: ['+unit.mueve+'], strength: ['+unit.strength+']">'
                        +'<img class="icon" id="icon'+finalCell[0]+''+finalCell[1]+initialCell[2]+'" src="images/SRUsed_del_def.png"></img></a>');

                }else if (result === 'none'){
                    $('#cell'+finalCell[0]+''+finalCell[1]).html('<a id="tooltip'+finalCell[0]+''+finalCell[1]+initialCell[2]
                        +'" href="#" data-toggle="tooltip" title="['+unit.name+']. Mueve: ['+unit.mueve+'], strength: ['+unit.strength+']">'
                        +'<img class="icon" id="icon'+finalCell[0]+''+finalCell[1]+initialCell[2]+'" src="images/SR_del_def.png"></img></a>');
                }

            break;
            case 'Barbarian':
                if (result === 'looses'){
                    $('#cell'+finalCell[0]+''+finalCell[1]).html('');
                    
                }else{
                    $('#cell'+finalCell[0]+''+finalCell[1]).html('<a id="tooltip'+finalCell[0]+''+finalCell[1]+initialCell[2]
                        +'" href="#" data-toggle="tooltip" title="['+unit.name+']. Mueve: ['+unit.mueve_total+'], strength: ['+unit.strength+']">'
                        +'<img class="icon" id="icon'+finalCell[0]+''+finalCell[1]+initialCell[2]+'" src="images/SB_del_def.png"></img></a>');
                }
            break;
    }

        $('#cell' + initialCell[0] + '' + initialCell[1]).html('');
        $('.cell').off();
        $('.icon').click(showIconData);
        $('#info').hide();
        checkVictoryCondition();

    }else{

        if (unit.jugador === 'Roman'){
            alert('Invalid movement');
        }
    }
}

// Calculate the encounter result between a soldier and a soldier, or a soldier and a town; return true if unit wins.
function checkEncounter(unit){
    let adversary = '',
        conquered = 0,
        winner = '',
        loser = '',
        cell = unit.cell.replace('icon', '').split(""),
        
        iteration = [
            ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
            ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
        ],
        
        iterationLength = iteration.length,
        unitsLength = units.length,
        i = 0,
        j = 0,
        k = 0,
        newId = '',
        title = '',
    //Finds anything? 'none', 'vence' 0 'wins'
        result = 'none',
        audio = '';

    // Look for fights with other soldiers next to itself
    for (i = 0; i < iterationLength; i++){
         if ( ($(iteration[i]+' a img').attr('id') !== undefined)
            && ( (($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'e') && (unit.jugador === 'Roman'))
            ||(($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'a') && (unit.jugador === 'Barbarian'))
            ||(($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'n') && ((unit.jugador === 'Roman')||(unit.jugador === 'Barbarian'))) )

            ) {

            result = 'none';

            // Combat
            for (j = 0; j < unitsLength; j++){
                //console.log(units[j].cell.replace('icon', '').replace('a', '').replace('e','') + ' ===??? ' + iteration[i].replace('#cell', ''));
                if (units[j].cell.replace('icon', '').replace('a', '').replace('e','').replace('n','') === iteration[i].replace('#cell', '')) {
                    adversary = units[j];
                    break;
                }
            }

            // 100% win
            if (unit.strength > adversary.strength + 1) {
                winner = unit;
                loser = adversary;
                result = 'wins';
                destroyUnit(adversary);

            } else if (unit.strength + 1 < adversary.strength) {
                winner = adversary;
                loser = unit;
                result = 'looses';
                destroyUnit(unit);

            } else if (unit.strength === adversary.strength) {

                // Random winner (50%)
                if (Math.round(Math.random() * 1) === 1) {
                    winner = unit;
                    loser = adversary;
                    result = 'wins';
                    destroyUnit(adversary);

                } else {
                    winner = adversary;
                    loser = unit;
                    result = 'looses';
                    destroyUnit(unit);
                }
            } else if (unit.strength + 1 === adversary.strength) {

                // 25%
                if (Math.round(Math.random() * 3) === 0) {
                    winner = unit;
                    loser = adversary;
                    result = 'wins';
                    destroyUnit(adversary);

                } else {
                    winner = adversary;
                    loser = unit;
                    result = 'looses';
                    destroyUnit(unit);
                }

            } else if (unit.strength === adversary.strength + 1){

                // 25%
                if (Math.round(Math.random() * 3) !== 0) {
                    winner = unit;
                    loser = adversary;
                    result = 'wins';
                    destroyUnit(adversary);

                } else {
                    winner = adversary;
                    loser = unit;
                    result = 'looses';
                    destroyUnit(unit);
                }
            }

            // Loot for kill
            if ((winner.jugador === 'Roman')&&(loser.jugador !== 'Neutral')){
                gold[0]++;
                $('#gold').val(gold[0]);

            }else if ((winner.jugador === 'Barbarian')&&(loser.jugador !== 'Neutral')){
                gold[1]++;
            }

            // If not dead yet, keep looking for fights
            if (loser === unit){
                break;
            }
        }
    }

    // If unit is still alive, it can conquest towns
    if (result !== 'looses') {

        for (i = 0; i < iterationLength; i++){

            if (  ($(iteration[i]+' a img').attr('id') !== undefined)
                && (($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'N')
                || (($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'E') && (unit.jugador === 'Roman'))
                || (($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'A') && (unit.jugador === 'Barbarian')) )
                ) {

               //.log($(iteration[0]).attr('id').replace('icon', '').charAt(2));

                result = 'wins';

                unitsLength = units.length;

                // Find target unit in array 
                for (j = 0; j < unitsLength; j++){
                    if (units[j].cell === ($(iteration[i]+' img').attr('id'))) {
                        conquered = j;
                        break;
                    }
                }

                units[conquered].jugador = unit.jugador;
                units[conquered].name = getRandomName('Town', unit.jugador);

                if (unit.jugador === 'Roman'){
                    $(iteration[i]+' a img').attr('src', 'images/AR_del_def.png');
                    newId = $(iteration[i]+' img').attr('id').replaceAt( $(iteration[i]+' img').attr('id').length - 1, 'A');
                    $(iteration[i]+' a img').attr('id', newId);
                    units[conquered].cell = units[conquered].cell.replaceAt(units[conquered].cell.length - 1, 'A');

                    title = '['+units[conquered].name+']. Cantidad: ['+units[conquered].stats.cantidad+']. Calidad: ['+units[conquered].stats.calidad+']';

                    audio = new Audio('sounds/rom_conquest.mp3');
                }else if (unit.jugador === 'Barbarian'){
                    $(iteration[i]+' a img').attr('src', 'images/AB_del_def.png');
                    newId = $(iteration[i]+' img').attr('id').replaceAt( $(iteration[i]+' img').attr('id').length - 1, 'E');
                    $(iteration[i]+' a img').attr('id', newId);
                    units[conquered].cell = units[conquered].cell.replaceAt(units[conquered].cell.length - 1, 'E');
                    audio = new Audio('sounds/bar_conquest.mp3');

                    title = '['+units[conquered].name+']';
                }

                $(iteration[i]+' a').attr('title', title);
                // A soldier can only conquest onw town each turn 
                audio.play();
            }
        }
    }
    return result;
}

//
function destroyUnit(unit){
    $('#cell' + unit.cell.replace('icon','').replace('a', '').replace('e', '').replace('n','')).html('');
    units.splice(units.indexOf(unit), 1);

    let audio;

    if (unit.jugador === 'Roman'){
        audio = new Audio('sounds/scream.mp3');
        
    }else if (unit.jugador === 'Barbarian'){
        audio = new Audio('sounds/kill.mp3');
        
    }else if (unit.jugador === 'Neutral'){
        audio = new Audio('sounds/wolf_scream.mp3');
    }

    audio.play();
}

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
function upgradeMode(unit, upgrade){
    const errorMessage = 'You don\'t have enough gold!';
    
    let money = 0,
        cell = '',
        image = '',
        title = '';
    
    if (unit.jugador === 'Roman'){
        index = 0;
        image = 'AR_del_def';
        
    }else if (unit.jugador === 'Barbarian'){
        index = 1;
        image = 'AB_del_def';
    }

    if (upgrade === 'mej_cant'){

        if (unit.stats.precio_mej_cant <= gold[index]){
            gold[index] -= unit.stats.precio_mej_cant;
            unit.stats.precio_mej_cant += unit.stats.precio_mej_cant;
            unit.stats.cantidad++;
            $('#gold').val(gold[index]);

        }else{
            alert(errorMessage);
        }

    }else if (upgrade === 'mej_cal'){

        if (unit.stats.precio_mej_cal <= gold[index]){
            gold[index] -= unit.stats.precio_mej_cal;
            unit.stats.precio_mej_cal += unit.stats.precio_mej_cal;
            unit.stats.calidad++;
            $('#gold').val(gold[index]);

        }else{
            alert(errorMessage);
        }
    }

    cell = unit.cell.replace('icon', '#cell')
    cell = cell.substring(0, cell.length - 1);

    if (unit.jugador === 'Roman'){
        title = '['+unit.name+']. Quantity: ['+unit.stats.cantidad+'], Quality: ['+unit.stats.calidad+']';
        
    }else if (unit.jugador === 'Barbarian'){
        title = '['+unit.name+']';
    }

    $(cell).html('<a id="tooltip'+unit.cell.replace('icon','')
            +'" href="#" data-toggle="tooltip" title="'+title+'">'
            +'<img class="icon" id="'+unit.cell+'" src="images/'+image+'.png"></img></a>');

    $('#info').hide();
    $('.icon').click(showIconData);
}

// Check that there are still units in both sides; if not, victory one of the two factions wins 
function checkVictoryCondition(){
    const victory_message_eng = 'Victory! The are is safe again.',
          victory_message_spa = '¡Victoria! La zona vuelve a ser segura.',
          defeat_message_eng = 'The Barbarians are everywhere! Rome will fall...',
          defeat_message_spa = '¡Los Bárbaros están por todos lados! Roma caerá...';

    let i = 0,
        unitsLength = units.length,
    //Alive [Romans, Barbarians]
        alive = [0,0],
        audio = '';

    // Player have to destroy all barbarians soldiers and towns. AI wins just by killing all roman soldiers. 
    for (i = 0; i < unitsLength; i++){

        if ( (units[i].tipo === 'Soldier') && (units[i].jugador === 'Roman') ){
            alive[0]++;
            
        }else if (units[i].jugador === 'Barbarian'){
            alive[1]++;
        }
    }

    if (alive[1] === 0){
        audio = new Audio('sounds/victory.mp3');
        alert(victory_message_eng);
        audio.play();
        goToNextMap();

    }else if (alive[0] === 0){
        audio = new Audio('sounds/loose.mp3');
        alert(defeat_message_eng);
        audio.play();
        //location.reload();
        mapGenerator(blueprints[currentMapLevel]);
    }
}

// Advance to the next level. If it's last level, show victory message and end game. Uses cookie for storing current level.
function goToNextMap(){
    const maps_messages_eng = [
            'Welcome! You are a Roman General and you have been informed that some nasty Barbarians are assaulting little towns outside Rome. Use your soldiers to finish the enemy and recover control over those towns!',
            'Even little mountain towns have the right to be protected against the sadistic Barbarians!',
            'Those damn uncivilized folks! They aren\'t even able to organize for battle...',
            'Your explorer asures you that the road is safe... but something smells bad... it\'s like the smell of people that haven\'t wash for years!',
            'Damn it! Your explorer lured us to the enemy den. There\'re anemies everywhere!',
            'The traitor explorer is hidding somewhore in this barbarian valley... it\'s time for revenge!',
            'While our troops were in the valley, a giant wolf pack is causing chaos on nearby towns, lured by blood!',
            'Those Barbarians sure know how to ambush people on the mountains... but they\'ll never overcome the iron discipline of the Roman army!',
            'Finally... you arrive to the main Barbarian camp... but you are all alone. Regroup and finish the enemy!',
            'Rome reinforcements are here! Time to finish with the lasts of the Barbarians... For Rome!'
        ],
          
        maps_messages_spa = [
            '¡Bienvenido! Has sido informado de que unos bárbaros están asaltando los pueblos de los alrededores de Roma. ¡Utiliza tus soldados para acabar con el enemigo y recupera esos pueblos!',
            '¡Incluso los pequeños pueblos de las montañas merecen ser protegidos de los sádicos Bárbaros!',
            'Estos malditos incivilizados no son siquiera capaces de formar para la batalla...',
            'Tu explorador te ha asegurado que el paso es seguro... pero algo huele mal... como a gente que hace años que no se baña...',
            '¡Maldición! Tu explorador te ha llevado de lleno a la boca del lobo. ¡Hay enemigos por todas partes!',
            'Tu explorador traidor se oculta en algún lugar de este valle lleno de bárbaros... es hora de la venganza',
            '¡Mientras nuestras tropas estaban destacadas en el valle, una manada gigantesca de lobos rodean los poblados cercanos atraidos por la sangre!',
            'Estos bárbaros son buenos tendiendo emboscadas en las montañas... ¡Pero nunca vencerán a la férrea disciplina del ejército Romano!',
            'Al fin... has llegado al campamento principal de los Bárbaros... aunque solo quedas tú. ¡Reúne fuerzas y acaba con ellos!',
            '¡Han llegado los refuerzos que Roma prometió...! Es hora de terminar con los últimos supervivientes bárbaros... ¡Por Roma!'
        ],  
        
        win_message_eng = 'Congratulations, you completed the game! Those Barbarians won\'t be a threat for our beloved Rome anymore... right?',
          
        win_message_spa = '¡Felicidades, has completado el juego! Esos bárbaros no volverán a amenazar la bella Roma... ¿O tal vez ésto solo sea el principio?';
    

    currentMapLevel++;

    if (currentMapLevel >= blueprints.length ){
        alert(win_message);
//        document.cookie = "mapa=" + 1 + "; expires=Thu, 07 Dec 2017 12:00:00 UTC";
        location.reload();
        
    }else{
//        document.cookie = "mapa=" + currentMapLevel + "; expires=Thu, 07 Dec 2017 12:00:00 UTC";
        mapGenerator(blueprints[currentMapLevel]);
        alert(maps_messages_eng[currentMapLevel]);
    }
}
