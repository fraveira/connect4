(function() {
	var currentPlayer = 'player1';
	var column = $('.column');
	var row = $('.column').children();
	var difficulty = 4;

	$(document).on('click', '.column', function(e) {
		var col = $(e.currentTarget);
		var slotsInCol = col.find('.slot');
		var foundAnEmptySlot = false;
		for (var i = 5; i >= 0; i--) {
			if (!slotsInCol.eq(i).hasClass('player1') && !slotsInCol.eq(i).hasClass('player2')) {
				foundAnEmptySlot = true;
				break;
			}
		}
		if (!foundAnEmptySlot) {
			return;
		}
		slotsInCol.eq(i).addClass(currentPlayer);

		if (checkForVictory(slotsInCol)) {
			victory();
		}
		if (checkForVictory($('.row' + i))) {
			victory();
		}
		if (checkForDiagonal(column, row)) {
			victory();
		}

		switchPlayers();
	});

	function checkForVictory(slots) {
		var count = 0;
		for (var i = 0; i < slots.length; i++) {
			if (slots.eq(i).hasClass(currentPlayer)) {
				count++;
				if (count == difficulty) {
					return true;
				}
			} else {
				count = 0;
			}
		}
	}

	function checkForDiagonal(col, row) {
		for (col = 0; col < column.length; col++) {
			for (row = 0; row < column.eq(0).children().length; row++) {
				if (difficulty == 4) {
					if (
						// Checking top right.+- // Or bottom left.
						column.eq(col).children().eq(row).hasClass(currentPlayer) &&
						column.eq(col + 1).children().eq(row - 1).hasClass(currentPlayer) &&
						column.eq(col + 2).children().eq(row - 2).hasClass(currentPlayer) &&
						column.eq(col + 3).children().eq(row - 3).hasClass(currentPlayer)
					) {
						console.log('Difficulty is ' + difficulty);
						return true;
					}
					if (
						// Checking top left -- // Or bottom right
						column.eq(col).children().eq(row).hasClass(currentPlayer) &&
						column.eq(col - 1).children().eq(row - 1).hasClass(currentPlayer) &&
						column.eq(col - 2).children().eq(row - 2).hasClass(currentPlayer) &&
						column.eq(col - 3).children().eq(row - 3).hasClass(currentPlayer)
					) {
						console.log('Difficulty is ' + difficulty);
						return true;
					}
				} else if (difficulty == 5) {
					if (
						// Checking top right.+- // Or bottom left.
						column.eq(col).children().eq(row).hasClass(currentPlayer) &&
						column.eq(col + 1).children().eq(row - 1).hasClass(currentPlayer) &&
						column.eq(col + 2).children().eq(row - 2).hasClass(currentPlayer) &&
						column.eq(col + 3).children().eq(row - 3).hasClass(currentPlayer) &&
						column.eq(col + 4).children().eq(row - 4).hasClass(currentPlayer)
					) {
						return true;
					}
					if (
						// Checking top left -- // Or bottom right
						column.eq(col).children().eq(row).hasClass(currentPlayer) &&
						column.eq(col - 1).children().eq(row - 1).hasClass(currentPlayer) &&
						column.eq(col - 2).children().eq(row - 2).hasClass(currentPlayer) &&
						column.eq(col - 3).children().eq(row - 3).hasClass(currentPlayer) &&
						column.eq(col - 4).children().eq(row - 4).hasClass(currentPlayer)
					) {
						return true;
					}
				}
			}
		}
	}

	function switchPlayers() {
		if (currentPlayer == 'player1') {
			currentPlayer = 'player2';
		} else {
			currentPlayer = 'player1';
		}
		$('img').toggleClass('rotate');
	}

	function victory() {
		$('.popup').fadeIn(2000);
		$('.popup').css('display', 'block');
		$('.popup').prepend('<h1> THE ' + currentPlayer.toUpperCase() + ' WON!</h1>');
	}

	$('.colplus').on('click', function() {
		$('.column').eq(0).clone().appendTo('#board');
		column = $('.column');
	});

	$('.difficult').on('click', function() {
		difficulty = 5;
		$('.five').css('visibility', 'visible');
		$('.four').css('text-decoration', 'line-through');
	});

	$('.restart').on('click', function() {
		location.reload();
	});
})();
