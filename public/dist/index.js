const validPlanetSituations = ["Habitado", "Habitável", "Inabitável", "Inexplorado"];
let planets = [];
let option = false;
do {
    option = menu();
    switch (option) {
        case 1:
            const name = prompt('Digite o nome do planeta a ser adicionado');
            const coordinates = getcoordinates();
            const situation = getSituation();
            const satellites = prompt('Digite o nome dos sátelites do planeta. (Cada um separado por vírgula)').split(', ') ?? [];
            savePlanet({ name, coordinates, satellites, situation });
            alert(`O planeta ${name} foi registrado!`);
            break;
        case 2:
            alert(listAllPlanets());
            break;
        case 3:
            const planetName = prompt('Digite o nome do planeta que deseja atualizar');
            const foundPlanet = findPlanet(planetName);
            if (!foundPlanet) {
                alert('Planeta não encontrado');
                break;
            }
            const planetSituation = getSituation();
            updatePlanetSituation(foundPlanet.name, planetSituation);
            alert(`O planeta ${foundPlanet.name} agora esta registrado como ${planetSituation}`);
            break;
        case 4:
            const inputedPlanetName = prompt('Digite o nome do planeta que deseja adicionar novos satélites');
            const inputedFoundPlanet = findPlanet(inputedPlanetName);
            if (!inputedFoundPlanet) {
                alert('Planeta não encontrado');
                break;
            }
            const inputedSatellites = prompt('Digite o nome dos satélites. (Separar-los por vírgula)').split(',') ?? [];
            planets.map(planet => planet === inputedFoundPlanet && inputedSatellites && (inputedFoundPlanet.satellites.push(...inputedSatellites)));
            alert('Satélites adicionados');
            break;
        case 5:
            const promptPlanetName = prompt('Digite o nome do planeta que deseja remover satélites');
            const promptFoundPlanet = findPlanet(promptPlanetName);
            if (!promptFoundPlanet) {
                alert('Planeta não encontrado');
                break;
            }
            const chosenSatellites = prompt('Digite o nome dos satélites. (Separar-los por vírgula)').split(',').map(s => s.trim()) ?? [];
            chosenSatellites?.forEach(chosenSatellite => {
                if (promptFoundPlanet.satellites.includes(chosenSatellite)) {
                    planets.map(planet => {
                        if (planet === promptFoundPlanet) {
                            planet.satellites = planet.satellites.filter(satellite => satellite !== chosenSatellite);
                        }
                    });
                }
            });
            alert('Satélites removidos');
            break;
    }
} while (option != 6);
function savePlanet(planet) {
    planets.push(planet);
}
function findPlanet(planetName) {
    return planets.find(planet => planet.name === planetName) ?? false;
}
function updatePlanetSituation(planetName, newSituation) {
    const foundPlanet = findPlanet(planetName);
    if (!foundPlanet)
        return "Planeta não encontrado";
    planets.map(planet => planet === foundPlanet && (planet.situation = newSituation));
    return `O planeta ${planetName} agora está ${newSituation}`;
}
function addSatelliteToPlanet(planetName, satelliteName) {
    const foundPlanet = findPlanet(planetName);
    if (!foundPlanet)
        return "Planeta não encontrado";
    planets.map(planet => planet === foundPlanet && planet.satellites.push(satelliteName));
    return `Novo satélite adicionado ao planeta ${planetName}`;
}
function removeSatelliteFromPlanet(planetName, satelliteName) {
    const foundPlanet = findPlanet(planetName);
    if (!foundPlanet)
        return "Planeta não encontrado";
    if (!foundPlanet.satellites.includes(satelliteName))
        return `O planeta ${planetName} não possui o satélite ${satelliteName}`;
    planets.map(planet => planet === foundPlanet && planet.satellites.splice(planet.satellites.indexOf(satelliteName), 1));
    return `Satélite ${satelliteName} removido do planeta ${planetName}`;
}
function listAllPlanets() {
    let message = "Lista de planetas\n";
    message += "---------------------\n\n";
    planets?.forEach(planet => {
        message += `Nome: ${planet.name}\n`;
        message += `Situação: ${planet.situation}\n`;
        message += `Satélites: ${planet.satellites.join(', ')}\n`;
        message += `Coordenadas: ${planet.coordinates.toString()}\n`;
        message += `----------------------\n\n`;
    });
    return message;
}
function menu() {
    let options = 'Digite a opção desejada:\n';
    options += '---------------------\n\n';
    options += '1 - Adicionar novo planeta\n';
    options += '2 - Listar todos os planetas\n';
    options += '3 - Atualizar situação de um planeta\n';
    options += '4 - Adicionar novo satélite a um planeta\n';
    options += '5 - Remover satélite de um planeta\n';
    options += '6 - Sair da navegação\n';
    let chosenOption = prompt(options);
    const possibleOptions = Array.from({ length: 6 }, (x, n) => n + 1);
    if (!possibleOptions.includes(Number(chosenOption)))
        return false;
    return Number(chosenOption);
}
function getcoordinates() {
    let input = prompt('Digite as *quatro* coordenadas do planeta. (Cada coordenada separada por vírgula)');
    let coordinates = input.split(',').map(value => value.trim());
    while (coordinates.length !== 4) {
        alert('Coordenadas inválidas');
        input = prompt('Digite as *quatro* coordenadas do planeta. (Cada coordenada separada por vírgula)');
        coordinates = input.split(',').map(value => value.trim());
    }
    coordinates = coordinates.map(value => Number(value));
    return [coordinates[0], coordinates[1], coordinates[2], coordinates[3]];
}
function getSituation() {
    let options = 'Digite a opção correspondente ao estado atual do planeta\n\n';
    validPlanetSituations.map((situation, index) => options += `${index + 1} - ${situation}\n`);
    let chosenOption = Number(prompt(options));
    while (!validPlanetSituations[chosenOption - 1]) {
        alert('Opção invalida');
        chosenOption = Number(prompt(options));
    }
    return validPlanetSituations[chosenOption - 1];
}
