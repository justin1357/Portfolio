(function() {
    var currentPlayer = "player1";
    var allHoles = $(".hole");
    var diag = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ];

    $(".column").on("click", function(e) {
        var col = $(e.currentTarget);
        var holesInCol = col.find(".hole");
        var addedClass = false;
        for (var i = 5; i >= 0; i--) {
            if (
                !holesInCol.eq(i).hasClass("player1") &&
                !holesInCol.eq(i).hasClass("player2")
            ) {
                holesInCol.eq(i).addClass(currentPlayer);
                addedClass = true;
                break;
            }

            if (i == 0) {
                alert("Hey!!!! This column is already Full!!!!");
            }
        }
        if (!addedClass) {
            return;
        }
        var slotsInRow = $(".column .slot:nth-child(" + (i + 1) + ") .hole");

        if (checkForVictory(slotsInRow)) {
            $(".winner").addClass("won");
            $("img").on("click", function() {
                $(".winner").removeClass("won");
                allHoles.removeClass("player1 player2");
            });
        }
        if (checkForVictory(holesInCol)) {
            $(".winner").addClass("won");
            $("img").on("click", function() {
                $(".winner").removeClass("won");
                allHoles.removeClass("player1 player2");
            });
        }
        if (diagonalCheck()) {
            $(".winner").addClass("won");
            $("img").on("click", function() {
                $(".winner").removeClass("won");
                allHoles.removeClass("player1 player2");
            });
        }
        switchPlayers();
        turnIndicator();
    });

    function turnIndicator() {
        if (currentPlayer == "player1") {
            $(".player1turn").addClass("turn");
            $(".player2turn").removeClass("turn");
        }
        if (currentPlayer == "player2") {
            $(".player1turn").removeClass("turn");
            $(".player2turn").addClass("turn");
        }
    }
    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }
    function checkForVictory(x) {
        var count = 0;

        for (var i = 0; i < x.length; i++) {
            if (x.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }
    function diagonalCheck() {
        var allHoles = $(".hole");
        var checker = 0;
        for (var i = 0; i < 24; i++) {
            checker = 0;
            for (var j = 0; j < diag[i].length; j++) {
                if (allHoles.eq(diag[i][j]).hasClass(currentPlayer)) {
                    checker++;
                } else {
                    checker = 0;
                }
                if (checker == 4) {
                    return true;
                }
            }
        }
    }
})();
