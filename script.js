const STREAMERSELECTOR = document.getElementsByClassName('streamerSelector')[0];
const INPUTFIELD = document.getElementsByClassName('jsonUpload')[0];
const ROLESELECTOR = document.getElementsByClassName('roleSelector')[0];
const OUTPUT = document.getElementsByClassName('output')[0];

const streamerNames = ["marksam32", "Strike-Kaboom"];
const roles = ["Streamer", "SuperUser", "Admin", "Mod", "ScoringManager", "Defuser", "User", "Banned"]

roles.forEach(element => {
    let option = document.createElement("option");
    option.value = element;
    option.text = element;
    ROLESELECTOR.add(option);
});

function parseStreamer() {
    const value = STREAMERSELECTOR.value;
    const role = ROLESELECTOR.value;

    if(value == 0) {
        return;
    }

    fetch(getStreamerLink(value)).then(res => res.json()).then(data => showData(data, role)).catch(err => {throw err});
}

function parseJson() {
    console.log("json")
}


function getStreamerLink(value) {
    return `https://raw.githubusercontent.com/${streamerNames[value - 1]}/StreamSettings/master/AccessLevels.json`
}

function showData(data, role) {
    const UserAccessLevels = data.UserAccessLevel;

    let usersWithRole = Object.keys(UserAccessLevels).filter(x => UserAccessLevels[x].includes(role));
    OUTPUT.innerHTML = usersWithRole.join('<br>');
    navigator.clipboard.writeText(usersWithRole.join('\n'))
    alert('Copied output to clipboard')
}