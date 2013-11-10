function Block(row, column, color, moves) {
    var self = this;
    self.Moves = ko.observable(moves);
    self.BlockId = ko.observable('block-' + row + '-' + column);

    self.HomeRow = ko.observable(row); // keeps track of the row it should be in at the end
    self.Row = ko.observable(row); // keeps track of the row it's currently in
    self.Column = ko.observable(column);

    self.Color = ko.observable(color);

    self.disabled = ko.observable();
    self.Disabled = ko.computed({
        read: function () {
            if (self.Moves() == 0) {
                return true;
            } else {
                return self.disabled();
            }
        },
        write: function (val) {
            self.disabled(val);
        }
    });
    self.Selected = ko.observable(false);

    self.Correct = ko.computed(function () {
        return self.HomeRow() == self.Row() && self.Moves() == 0;
    });
    self.Dots = ko.computed(function () {
        var dots = '';
        for (var i = 0; i < self.Moves(); i++) {
            dots += '&bull;';
        }
        if (!dots) {
            dots = self.Correct() ? '&#x2665;' : 'X';
        }
        return dots;
    });

    self.TriggerBoardSelection = function () {
        if (!self.Disabled()) {
            self.Selected(!self.Selected());
            App.Board.SelectBlock(self, self.Selected());
        }
    }
    self.Select = function (block, selected) {
        if (selected && block.BlockId() != self.BlockId()) {
            if (block.Row() != self.Row() && block.Column() != self.Column()) {
                self.Disabled(true);
            } else {
                self.Disabled(false);
            }
        } else if (!selected) {
            self.Disabled(false);
        }
    }
}