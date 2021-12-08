const archSerie = document.getElementById('arch_serie');
const archBatchMono = document.getElementById('arch_batch_mono');
const archBatchMulti = document.getElementById('arch_batch_multi');
const archSharedTime = document.getElementById('arch_shared_time');
const inputProcessQuantity = document.getElementById('process_quantity');

const execButton = document.getElementById('exec_button');

const processes = document.getElementById('processes');
const totalTime = document.getElementById('total_time');
const memoryInfo = document.getElementById('memory_info');

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
            batchProcessingMono(processQuantity);
        } else if (archBatchMulti.checked) {
            resetDivProcesses();
            batchProcessingMulti(processQuantity);
        } else if (archSharedTime.checked) {
            resetDivProcesses();
            shareTimeSystem(processQuantity)
        } else {
            window.alert('Aun no ha seleccionado una arquitectura');
        }
    } else {
        window.alert('Aun no ha ingresado una cantidad de procesos');
    }
}

/**
 * Método que permite mostrar las operaciones de un Sistema Operativo con Procesamiento en serie
 * @param {*} processQuantity 
 */
function serialProcessing(processQuantity) {
    let processTimes = [];
    let processTime = 0;
    for (let i = 0; i < processQuantity; i++) {
        const newDiv = document.createElement('div');
        newDiv.id = `process${i}`;
        const pNumberProcess = document.createElement('p');
        pNumberProcess.innerHTML = `<b>Proceso ${i+1}</b>`;
        pNumberProcess.id = 'number_process';
        const pCreated = document.createElement('p');
        pCreated.innerHTML = '<b>Created</b>';
        pCreated.id = `created${i}`;
        const pReady = document.createElement('p');
        pReady.innerHTML = '<b>Ready</b>';
        pReady.id = `ready${i}`;
        const pExecuting = document.createElement('p');
        pExecuting.innerHTML = '<b>Executing</b>';
        pExecuting.id = `executing${i}`;
        const pTerminated = document.createElement('p');
        pTerminated.innerHTML = '<b>Terminated</b>';
        pTerminated.id = `terminated${i}`;
        let processTime = generatePseudoRandom(3, 7);
        processTimes.push(processTime);
        const pTimeProcess = document.createElement('p');
        pTimeProcess.innerText = `Tiempo: ${processTime} s`;
        pTimeProcess.id = `time_process`;
        newDiv.append(pNumberProcess, pCreated, pReady, pExecuting, pTerminated, pTimeProcess);
        processes.appendChild(newDiv);
    }
    totalTime.innerHTML = `<p><b>Tiempo total: ${processTime} s</b></p>`;

    for (let i = 0; i < processQuantity; i++) {
        document.getElementById(`created${i}`).style.background = BLUE_COLOR;
    }

    const sleep = (milliseconds) => {
        return new Promise((resolve) => {setTimeout(resolve, milliseconds)})
    }
    const changeState = async () => {
        await sleep(1000);
        for (let i = 0; i < processQuantity; i++) {
            await sleep(300);
            document.getElementById(`created${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`ready${i}`).style.background = YELLOW_COLOR;
            await sleep(300);
            document.getElementById(`ready${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`executing${i}`).style.background = GREEN_COLOR;

            for (let j = 0; j < processTimes[i]; j++) {
                await sleep(1000);
                document.getElementById(`process${i}`).lastChild.innerText = `Tiempo: ${processTimes[i] - (j+1)} s`;
                processTime++;
                totalTime.innerHTML = `<p><b>Tiempo total: ${processTime} s</b></p>`;
            }
            document.getElementById(`executing${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`terminated${i}`).style.background = ORANGE_COLOR;
        }
    }
    changeState();
}

function batchProcessingMono(processQuantity) {
    let processSizes = [];
    let processTimes = [];
    let memorySize = 256;
    let actualProcessTime = 0;
    const pTotalMemory = document.createElement('p');
    pTotalMemory.innerHTML = `<b>Memoria Total: ${memorySize} KB</b>`;
    pTotalMemory.id = 'memory_size';
    const pBusyMemory = document.createElement('p');
    pBusyMemory.innerHTML = `<b>Memoria Ocupada: 0 KB</b>`;
    pBusyMemory.id = 'busy_memory';
    memoryInfo.append(pTotalMemory, pBusyMemory);
    for (let i = 0; i < processQuantity; i++) {
        const newDiv = document.createElement('div');
        newDiv.id = `process${i}`;
        const pNumberProcess = document.createElement('p');
        pNumberProcess.innerHTML = `<b>Proceso ${i+1}</b>`;
        pNumberProcess.id = 'number_process';
        const pCreated = document.createElement('p');
        pCreated.innerHTML = '<b>Created</b>';
        pCreated.id = `created${i}`;
        const pReady = document.createElement('p');
        pReady.innerHTML = '<b>Ready</b>';
        pReady.id = `ready${i}`;
        const pExecuting = document.createElement('p');
        pExecuting.innerHTML = '<b>Executing</b>';
        pExecuting.id = `executing${i}`;
        const pTerminated = document.createElement('p');
        pTerminated.innerHTML = '<b>Terminated</b>';
        pTerminated.id = `terminated${i}`;
        let processSize = generatePseudoRandom(50, 80);
        processSizes.push(processSize);
        const pProcessSize = document.createElement('p');
        pProcessSize.innerHTML = `Tamaño: ${processSize} KB`;
        pProcessSize.id = 'size_process';
        let processTime = generatePseudoRandom(3, 7);
        processTimes.push(processTime);
        const pTimeProcess = document.createElement('p');
        pTimeProcess.innerText = `Tiempo: ${processTime} s`;
        pTimeProcess.id = 'time_process';
        newDiv.append(pNumberProcess, pCreated, pReady, pExecuting, pTerminated, pProcessSize, pTimeProcess);
        processes.appendChild(newDiv);
    }

    for (let i = 0; i < processQuantity; i++) {
        document.getElementById(`created${i}`).style.background = BLUE_COLOR;
    }

    const sleep = (milliseconds) => {
        return new Promise((resolve) => {setTimeout(resolve, milliseconds)})
    }

    let sumProcessesSize = 0;
    let attended = 0;
    const changeState = async () => {
        await sleep(1000);
        for (let i = 0; i < processQuantity; i++) {
            sumProcessesSize += processSizes[i];
            if (sumProcessesSize > memorySize || i == processQuantity-1) {
                if (i != processQuantity-1 || (i == processQuantity-1 && sumProcessesSize > memorySize)) {
                    sumProcessesSize -= processSizes[i];
                } else if (i == processQuantity-1 && sumProcessesSize <= memorySize) {
                    i++;
                }

                await sleep(100);
                document.getElementById('busy_memory').innerHTML = `<b>Memoria Ocupada: ${sumProcessesSize} KB</b>`;
                for (let j = attended; j < i; j++) {
                    document.getElementById(`created${j}`).style.background = DARK_GRAY_COLOR;
                    document.getElementById(`ready${j}`).style.background = YELLOW_COLOR;
                    await sleep(70);
                }
                for (let j = attended; j < i; j++) {
                    document.getElementById(`ready${j}`).style.background = DARK_GRAY_COLOR;
                    document.getElementById(`executing${j}`).style.background = GREEN_COLOR;
                    for (let k = 0; k < processTimes[j]; k++) {
                        await sleep(1000);
                        document.getElementById(`process${j}`).lastChild.innerText = `Tiempo: ${processTimes[j] - (k+1)} s`;
                        actualProcessTime++;
                        totalTime.innerHTML = `<p><b>Tiempo total: ${actualProcessTime} s</b></p>`;
                    }
                    document.getElementById(`executing${j}`).style.background = DARK_GRAY_COLOR;
                    document.getElementById(`terminated${j}`).style.background = ORANGE_COLOR;
                }
                attended = i;
                sumProcessesSize = 0;
                i--;
            }
        }
    }
    changeState();
}

function batchProcessingMulti(processQuantity) {
    let processSizes = [];
    let processTimes = [];
    let memorySize = 256;
    const QUANTUM = 2; //medida en segundos
    let actualProcessTime = 0;
    const pTotalMemory = document.createElement('p');
    pTotalMemory.innerHTML = `<b>Memoria Total: ${memorySize} KB</b>`;
    pTotalMemory.id = 'memory_size';
    const pBusyMemory = document.createElement('p');
    pBusyMemory.innerHTML = `<b>Memoria Ocupada: 0 KB</b>`;
    pBusyMemory.id = 'busy_memory';
    memoryInfo.append(pTotalMemory, pBusyMemory);
    for (let i = 0; i < processQuantity; i++) {
        const newDiv = document.createElement('div');
        newDiv.id = `process${i}`;
        const pNumberProcess = document.createElement('p');
        pNumberProcess.innerHTML = `<b>Proceso ${i+1}</b>`;
        pNumberProcess.id = 'number_process';
        const pCreated = document.createElement('p');
        pCreated.innerHTML = '<b>Created</b>';
        pCreated.id = `created${i}`;
        const pReady = document.createElement('p');
        pReady.innerHTML = '<b>Ready</b>';
        pReady.id = `ready${i}`;
        const pWaiting = document.createElement('p');
        pWaiting.innerHTML = '<b>Waiting</b>';
        pWaiting.id = `waiting${i}`;
        const pExecuting = document.createElement('p');
        pExecuting.innerHTML = '<b>Executing</b>';
        pExecuting.id = `executing${i}`;
        const pTerminated = document.createElement('p');
        pTerminated.innerHTML = '<b>Terminated</b>';
        pTerminated.id = `terminated${i}`;
        let processSize = generatePseudoRandom(50, 80);
        processSizes.push(processSize);
        const pProcessSize = document.createElement('p');
        pProcessSize.innerHTML = `Tamaño: ${processSize} KB`;
        pProcessSize.id = 'size_process';
        let processTime = generatePseudoRandom(3, 7);
        processTimes.push(processTime);
        const pTimeProcess = document.createElement('p');
        pTimeProcess.innerText = `Tiempo: ${processTime} s`;
        pTimeProcess.id = 'time_process';
        newDiv.append(pNumberProcess, pCreated, pReady, pWaiting, pExecuting, pTerminated, pProcessSize, pTimeProcess);
        processes.appendChild(newDiv);
    }

    for (let i = 0; i < processQuantity; i++) {
        document.getElementById(`created${i}`).style.background = BLUE_COLOR;
    }

    const sleep = (milliseconds) => {
        return new Promise((resolve) => {setTimeout(resolve, milliseconds)})
    }

    let sumProcessesSize = 0;
    let attended = 0;
    let processQueue = [];
    const changeState = async () => {
        await sleep(1000);
        for (let i = 0; i < processQuantity; i++) {
            sumProcessesSize += processSizes[i];
            if (sumProcessesSize > memorySize || i == processQuantity-1) {
                if (i != processQuantity-1 || (i == processQuantity-1 && sumProcessesSize > memorySize)) {
                    sumProcessesSize -= processSizes[i];
                } else if (i == processQuantity-1 && sumProcessesSize <= memorySize) {
                    i++;
                }

                await sleep(500);
                document.getElementById('busy_memory').innerHTML = `<b>Memoria Ocupada: ${sumProcessesSize} KB</b>`;
                console.log(attended);
                for (let j = attended; j < i; j++) {
                    processQueue.push({process: j, processTime: processTimes[j]});
                    document.getElementById(`created${j}`).style.background = DARK_GRAY_COLOR;
                    document.getElementById(`ready${j}`).style.background = YELLOW_COLOR;
                    await sleep(70);
                }

                await sleep(300);
                if (processQueue.length > 1) {
                    for (let j = 1; j < processQueue.length; j++) {
                        document.getElementById(`ready${processQueue[j].process}`).style.background = DARK_GRAY_COLOR;
                        document.getElementById(`waiting${processQueue[j].process}`).style.background = RED_COLOR;
                    }
                }

                let isProcessingBatch = false;
                while(processQueue.length != 0) {
                    if (isProcessingBatch) {
                        document.getElementById(`waiting${processQueue[0].process}`).style.background = DARK_GRAY_COLOR;
                        document.getElementById(`ready${processQueue[0].process}`).style.background = YELLOW_COLOR;
                        await sleep(300);
                        
                    }
                    document.getElementById(`ready${processQueue[0].process}`).style.background = DARK_GRAY_COLOR;
                    document.getElementById(`executing${processQueue[0].process}`).style.background = GREEN_COLOR;
                    for (let j = 0; j < QUANTUM; j++) {
                        if(processQueue[0].processTime > 0) {
                            await sleep(1000);
                            document.getElementById(`process${processQueue[0].process}`).lastChild.innerText = `Tiempo: ${processQueue[0].processTime - 1} s`;
                            processQueue[0].processTime--;
                            actualProcessTime++;
                            totalTime.innerHTML = `<p><b>Tiempo total: ${actualProcessTime} s</b></p>`;
                        } else if (processQueue[0].processTime == 0) {
                            break;
                        }
                    }
                    document.getElementById(`executing${processQueue[0].process}`).style.background = DARK_GRAY_COLOR;
                    if (processQueue[0].processTime == 0) {
                        document.getElementById(`terminated${processQueue[0].process}`).style.background = ORANGE_COLOR;
                        processQueue.shift();
                    } else {
                        document.getElementById(`waiting${processQueue[0].process}`).style.background = RED_COLOR;
                        processQueue.push(processQueue.shift());
                    }
                    isProcessingBatch = true;
                }
                attended = i;
                sumProcessesSize = 0;
                i--;
            }
        }
    }
    changeState();
}

function shareTimeSystem(processQuantity) {
    let processTimes = [];
    let processTime = 0;
    for (let i = 0; i < processQuantity; i++) {
        const newDiv = document.createElement('div');
        newDiv.id = `process${i}`;
        const pNumberProcess = document.createElement('p');
        pNumberProcess.innerHTML = `<b>Proceso ${i+1}</b>`;
        pNumberProcess.id = 'number_process';
        const pCreated = document.createElement('p');
        pCreated.innerHTML = '<b>Created</b>';
        pCreated.id = `created${i}`;
        const pReady = document.createElement('p');
        pReady.innerHTML = '<b>Ready</b>';
        pReady.id = `ready${i}`;
        const pExecuting = document.createElement('p');
        pExecuting.innerHTML = '<b>Executing</b>';
        pExecuting.id = `executing${i}`;
        const pTerminated = document.createElement('p');
        pTerminated.innerHTML = '<b>Terminated</b>';
        pTerminated.id = `terminated${i}`;
        let processTime = generatePseudoRandom(3, 7);
        processTimes.push(processTime);
        const pTimeProcess = document.createElement('p');
        pTimeProcess.innerText = `Tiempo: ${processTime} s`;
        pTimeProcess.id = `time_process`;
        newDiv.append(pNumberProcess, pCreated, pReady, pExecuting, pTerminated, pTimeProcess);
        processes.appendChild(newDiv);
    }
    totalTime.innerHTML = `<p><b>Tiempo total: ${processTime} s</b></p>`;

    for (let i = 0; i < processQuantity; i++) {
        document.getElementById(`created${i}`).style.background = BLUE_COLOR;
    }

    const sleep = (milliseconds) => {
        return new Promise((resolve) => {setTimeout(resolve, milliseconds)})
    }
    const changeState = async () => {
        for (let i = 0; i < processQuantity; i++) {
            await sleep(300);
            document.getElementById(`created${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`ready${i}`).style.background = YELLOW_COLOR;
            await sleep(300);
            document.getElementById(`ready${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`executing${i}`).style.background = GREEN_COLOR;

            for (let j = 0; j < processTimes[i]; j++) {
                await sleep(1000);
                document.getElementById(`process${i}`).lastChild.innerText = `Tiempo: ${processTimes[i]-(j+1)} s`;
                processTime++;
                totalTime.innerHTML = `<p><b>Tiempo total: ${processTime} s</b></p>`;
            }
            document.getElementById(`executing${i}`).style.background = DARK_GRAY_COLOR;
            document.getElementById(`terminated${i}`).style.background = ORANGE_COLOR;
        }
    }
    changeState();
}

function resetDivProcesses() {
    memoryInfo.innerHTML = '';
    processes.innerHTML = '';
}

function generatePseudoRandom(minSec, maxSec) {
    return Math.round(Math.random() * (maxSec - minSec)) + minSec;
}