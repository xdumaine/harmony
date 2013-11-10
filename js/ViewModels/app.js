App = {
    Colors: [
    '#06276F',
    '#1142AA',
    '#007143',
    '#00AE68',
    '#A63100',
    '#FF4C00',
    '#A66E00',
    '#FFA900'
    ],
    Board: null
}
log = true;

function swapNodes(a, b) {
    var aparent = a.parentNode;
    var asibling = a.nextSibling === b ? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    aparent.insertBefore(b, asibling);
}

$(function () {
    App.Board = new Board(size);
     

    ko.applyBindings(App.Board);
});