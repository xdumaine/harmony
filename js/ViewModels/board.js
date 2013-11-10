function Board(size, moves, maxBlockMoves) {

    var self = this;
    self.Size = ko.observable(size);
    self.Rows = ko.observableArray();

    self.FirstColor = ko.observable();
    self.LastColor = ko.observable();

    self.Complete = ko.observable(false);

    self.SwapBlocks = function (blockA, blockB, moveChange) {
        if (log) {
            //console.log(blockA.BlockId(), blockB.BlockId());
        }
        var nodeA = $('#' + blockA.BlockId())[0];
        var nodeB = $('#' + blockB.BlockId())[0];
        swapNodes(nodeA, nodeB);

        var tRow = blockA.Row();
        var tCol = blockA.Column();
        blockA.Row(blockB.Row());
        blockA.Column(blockB.Column());
        blockB.Row(tRow);
        blockB.Column(tCol);
        blockA.Moves(blockA.Moves() + moveChange);
        blockB.Moves(blockB.Moves() + moveChange);
        
    }

    self.PreviewVisible = ko.observable(false);
    self.ShowPreview = function () {
        self.PreviewVisible(true);
    }
    self.HidePreview = function () {
        self.PreviewVisible(false);
    }

    self.SelectedBlock = ko.observable();


    self.SelectBlock = function (block, selected) {
        var rows = self.Rows();
        if (self.SelectedBlock()) { 
            var selectedBlock = self.SelectedBlock();
            if (selectedBlock.Row() != block.Row() && selectedBlock.Column() != block.Column()) {
                return; // verify that they're in the same row/column
            }
            if (selectedBlock.BlockId() == block.BlockId()) {
                self.SelectedBlock(null);
                return; //same block. don't do anything
            }

            self.SwapBlocks(selectedBlock, block, -1);
            self.SelectedBlock(null);            

            var items = self.Size() * self.Size();
            var itemsCorrect = 0;

            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < rows[i].length; j++) {
                    var block = rows[i][j];
                    block.Selected(false);
                    block.Disabled(false);
                    if (block.Correct()) { itemsCorrect++; }
                }
            }
            if (itemsCorrect == items) { self.Complete(true); }
        } else {
            if (selected) {
                self.SelectedBlock(block);
            } else {
                self.SelectedBlock(null);
            }

            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < rows[i].length; j++) {
                    rows[i][j].Select(block, selected);
                }
            }
        }
    }

    var rows = [];
    var colorOffset = Math.floor(Math.random() * App.Colors.length);
    self.FirstColor(App.Colors[colorOffset]);
    for (var i = 0; i < size; i++) {
        var blocks = [];
        var color = App.Colors[(i + colorOffset) % App.Colors.length];
        for (var j = 0; j < size; j++) {
            var block = new Block(i, j, color, 0);
            blocks.push(block);
        }
        rows.push(blocks);
    }
    self.Rows(rows);
    self.LastColor(color);
    
    var blocks = self.Rows();
    self.SwapRandom = function (r, c) {

        var r1 = Math.floor(Math.random() * size);
        var c1 = Math.floor(Math.random() * size);
        r1 = r !== undefined ? r : r1;
        c1 = c !== undefined ? c : c1;
        var block1 = blocks[r1][c1];
        var rowOrCol = !!((Math.random() * 2) | 0); // random boolean
        if (rowOrCol) {
            var r2 = r1;
            var c2 = c1;
            while (c2 == c1) {
                c2 = Math.floor(Math.random() * size);
            }
        } else {
            var r2 = r1;
            var c2 = c1;
            while (r2 == r1) {
                r2 = Math.floor(Math.random() * size);
            }
        }
        var block2 = blocks[r2][c2];
        blocks[r1][c1] = block2;
        blocks[r2][c2] = block1;
        self.SwapBlocks(block1, block2, 1);
        self.Complete(false);
    }

    setTimeout(function () {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                self.SwapRandom(i, j);
            }
        }
        log = false;
        //for (var i = 0; i < moves; i++) {
        //    self.SwapRandom();
        //}        
    }, 50);

    self.Reset = function () {
        window.location = window.location;
    }
}