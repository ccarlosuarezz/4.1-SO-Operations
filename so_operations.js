const archSerie = document.getElementById('arch_serie');
const archBatchMono = document.getElementById('arch_batch_mono');
const archBatchMulti = document.getElementById('arch_batch_multi');
const archSharedTime = document.getElementById('arch_shared_time');
const inputProcessQuantity = document.getElementById('process_quantity');

const execButton = document.getElementById('exec_button');

const processes = document.getElementById('processes');
const totalTime = document.getElementById('total_time');

const GREEN_COLOR = '#00D455';
const YELLOW_COLOR = '#FFCA03';
const BLUE_COLOR = '#3DB2FF';
const ORANGE_COLOR = '#F6830F';
const RED_COLOR = '#F90716';
const DARK_GRAY_COLOR = '#423F3E';
const WITHE_COLOR = '#F7F7F7';

const SECOND_IN_MILISECONDS = 1000;

execButton.addEventListener('click', simulate);

function simulate() {
    if (inputProcessQuantity.value) {
        let processQuantity = inputProcessQuantity.value;
        if(archSerie.checked) {
            resetDivProcesses();
            serialProcessing(processQuantity);
        } else if (archBatchMono.checked) {
            resetDivProcesses();
            window.alert('2');
        } else if (archBatchMulti.checked) {
            resetDivProcesses();
            window.alert('3');
        } else if (archSharedTime.checked) {
            resetDivProcesses();
            window.alert('4');
        } else {
            window.alert('Aun no ha seleccionado una arquitectura');
        }
    } else {
        window.alert('Aun no ha ingresado una cantidad de procesos');
    }
}

function serialProcessing(processQuantity) {
    let processTimes = [];
    for (let i = 1; i <= processQuantity; i++) {
        const newDiv = document.createElement('div');
        newDiv.id = `process${i}`;
        const pNumberProcess = document.createElement('p');
        pNumberProcess.innerHTML = `<strong>Proceso ${i}</strong>`;
        pNumberProcess.id = 'number_process';
        const pCreated = document.createElement('p');
        pCreated.innerHTML = '<strong>Created</strong>';
        pCreated.id = `created${i}`;
        const pReady = document.createElement('p');
        pReady.innerHTML = '<strong>Ready</strong>';
        pReady.id = `ready${i}`;
        const pExecuting = document.createElement('p');
        pExecuting.innerHTML = '<strong>Executing</strong>';
        pExecuting.id = `executing${i}`;
        const pTerminated = document.createElement('p');
        pTerminated.innerHTML = '<strong>Terminated</strong>';
        pTerminated.id = `terminated${i}`;
        let processTime = generatePseudoRandomProcessTime(3, 10);
        processTimes.push(processTime);
        const pTimeProcess = document.createElement('p');
        pTimeProcess.innerText = `Time: ${processTime} s`;
        pTimeProcess.id = `time_process`;
        newDiv.append(pNumberProcess, pCreated, pReady, pExecuting, pTerminated, pTimeProcess);
        processes.appendChild(newDiv);
    }

    for (let i = 1; i <= processQuantity; i++) {
        document.getElementById(`created${i}`).style.background = BLUE_COLOR;
    }

    const sleep = (milliseconds) => {
        return new Promise((resolve) => {setTimeout(resolve, milliseconds)})
    }
    const changeToReady = async () => {
        for (let i = 1; i <= processQuantity; i++) {
            await sleep(300);
            document.getElementById(`created${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`ready${i}`).style.background = YELLOW_COLOR;
            await sleep(300);
            document.getElementById(`ready${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`executing${i}`).style.background = GREEN_COLOR;

            for (let j = 1; j <= processTimes[i-1]; j++) {
                await sleep(1000);
                document.getElementById(`process${i}`).lastChild.innerText = `Time: ${processTimes[i-1] - j} s`;
            }
            document.getElementById(`executing${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`terminated${i}`).style.background = ORANGE_COLOR;
        }
    }
    changeToReady();

    // for (let i = 1; i <= processQuantity; i++) {
    //     await sleep(500).then(() => {
    //     });
        // setTimeout(() => {
        // }, 500*i);
        // setTimeout(() => {
        //     document.getElementById(`ready${i}`).style.background = DARK_GRAY_COLOR;
        //     document.getElementById(`executing${i}`).style.background = GREEN_COLOR;
        // }, 1000*i);
    // }
    totalTime.innerHTML = `<p><b>Tiempo total</b></p>`;

}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function batchProcessingMono(processQuantity) {
    for (let i = 0; i < processQuantity; i++) {
        const element = array[i];
        
    }
}

function batchProcessingMulti(processQuantity) {
    for (let i = 0; i < processQuantity; i++) {
        const element = array[i];
        
    }
}

function shareTimeSystem(processQuantity) {
    for (let i = 0; i < processQuantity; i++) {
        const element = array[i];
        
    }
}

function resetDivProcesses() {
    processes.innerHTML = '';
}

function generatePseudoRandomProcessTime(minSec, maxSec) {
    return Math.round(Math.random() * (maxSec - minSec)) + minSec;
}