class WindowManager {

    constructor(genome, cars) {
        this.genome = genome;
        this.dragging = {};

        this.cars = cars;
        this.track = new Track();
        this.checkPoints = new CheckPoints();

        // track 3
        this.track.addSegment(476, 17, 666, 17);
        this.track.addSegment(666, 17, 833, 26);
        this.track.addSegment(833, 26, 937, 69);
        this.track.addSegment(937, 69, 969, 187);
        this.track.addSegment(969, 187, 968, 358);
        this.track.addSegment(968, 358, 943, 542);
        this.track.addSegment(943, 542, 917, 592);
        this.track.addSegment(917, 592, 891, 604);
        this.track.addSegment(891, 604, 839, 612);
        this.track.addSegment(839, 612, 719, 616);
        this.track.addSegment(719, 616, 683, 599);
        this.track.addSegment(683, 599, 665, 560);
        this.track.addSegment(665, 560, 652, 506);
        this.track.addSegment(652, 506, 637, 453);
        this.track.addSegment(637, 453, 627, 401);
        this.track.addSegment(627, 401, 600, 361);
        this.track.addSegment(600, 361, 561, 356);
        this.track.addSegment(561, 356, 503, 354);
        this.track.addSegment(503, 354, 456, 366);
        this.track.addSegment(456, 366, 420, 420);
        this.track.addSegment(420, 420, 401, 485);
        this.track.addSegment(401, 485, 385, 544);
        this.track.addSegment(385, 544, 374, 568);
        this.track.addSegment(374, 568, 339, 602);
        this.track.addSegment(339, 602, 265, 602);
        this.track.addSegment(265, 602, 173, 597);
        this.track.addSegment(173, 597, 95, 579);
        this.track.addSegment(95, 579, 35, 506);
        this.track.addSegment(35, 506, 33, 403);
        this.track.addSegment(33, 403, 24, 283);
        this.track.addSegment(24, 283, 43, 161);
        this.track.addSegment(43, 161, 86, 77);
        this.track.addSegment(86, 77, 189, 38);
        this.track.addSegment(189, 38, 345, 20);
        this.track.addSegment(345, 20, 478, 19);
        this.track.addSegment(481, 83, 612, 88);
        this.track.addSegment(612, 88, 757, 95);
        this.track.addSegment(757, 95, 856, 134);
        this.track.addSegment(856, 134, 871, 261);
        this.track.addSegment(871, 261, 862, 388);
        this.track.addSegment(862, 388, 840, 507);
        this.track.addSegment(840, 507, 793, 519);
        this.track.addSegment(793, 519, 754, 485);
        this.track.addSegment(754, 485, 740, 416);
        this.track.addSegment(740, 416, 726, 351);
        this.track.addSegment(726, 351, 716, 314);
        this.track.addSegment(716, 314, 674, 286);
        this.track.addSegment(674, 286, 609, 267);
        this.track.addSegment(609, 267, 512, 267);
        this.track.addSegment(512, 267, 415, 297);
        this.track.addSegment(415, 297, 369, 350);
        this.track.addSegment(369, 350, 337, 428);
        this.track.addSegment(337, 428, 307, 485);
        this.track.addSegment(307, 485, 262, 523);
        this.track.addSegment(262, 523, 161, 505);
        this.track.addSegment(161, 505, 126, 412);
        this.track.addSegment(126, 412, 125, 306);
        this.track.addSegment(125, 306, 157, 195);
        this.track.addSegment(157, 195, 250, 122);
        this.track.addSegment(250, 122, 371, 95);
        this.track.addSegment(371, 95, 483, 84);
    
        this.checkPoints.addSegment(856, 135, 941, 79);
        this.checkPoints.addSegment(870, 254, 970, 249);
        this.checkPoints.addSegment(843, 509, 933, 565);
        this.checkPoints.addSegment(771, 503, 672, 573);
        this.checkPoints.addSegment(633, 419, 735, 390);
        this.checkPoints.addSegment(580, 360, 588, 269);
        this.checkPoints.addSegment(457, 368, 417, 301);
        this.checkPoints.addSegment(403, 484, 327, 454);
        this.checkPoints.addSegment(230, 600, 234, 521);
        this.checkPoints.addSegment(54, 527, 147, 469);
        this.checkPoints.addSegment(28, 321, 125, 319);
        this.checkPoints.addSegment(67, 122, 160, 197);
        this.checkPoints.addSegment(298, 28, 331, 106);

        // track 2
        // this.track.addSegment(476, 14, 676, 18);
        // this.track.addSegment(676, 18, 862, 65);
        // this.track.addSegment(862, 65, 968, 170);
        // this.track.addSegment(968, 170, 967, 312);
        // this.track.addSegment(967, 312, 944, 513);
        // this.track.addSegment(944, 513, 735, 612);
        // this.track.addSegment(735, 612, 493, 601);
        // this.track.addSegment(493, 601, 376, 528);
        // this.track.addSegment(376, 528, 356, 457);
        // this.track.addSegment(356, 457, 384, 387);
        // this.track.addSegment(384, 387, 513, 353);
        // this.track.addSegment(513, 353, 630, 326);
        // this.track.addSegment(630, 326, 672, 263);
        // this.track.addSegment(672, 263, 659, 186);
        // this.track.addSegment(659, 186, 528, 174);
        // this.track.addSegment(528, 174, 413, 190);
        // this.track.addSegment(413, 190, 283, 293);
        // this.track.addSegment(283, 293, 234, 464);
        // this.track.addSegment(234, 464, 177, 575);
        // this.track.addSegment(177, 575, 91, 608);
        // this.track.addSegment(91, 608, 21, 586);
        // this.track.addSegment(21, 586, 9, 453);
        // this.track.addSegment(9, 453, 13, 298);
        // this.track.addSegment(13, 298, 41, 126);
        // this.track.addSegment(41, 126, 156, 36);
        // this.track.addSegment(156, 36, 292, 20);
        // this.track.addSegment(292, 20, 478, 15);
        // this.track.addSegment(476, 57, 622, 66);
        // this.track.addSegment(622, 66, 772, 103);
        // this.track.addSegment(772, 103, 853, 202);
        // this.track.addSegment(853, 202, 860, 325);
        // this.track.addSegment(860, 325, 845, 473);
        // this.track.addSegment(845, 473, 719, 530);
        // this.track.addSegment(719, 530, 550, 525);
        // this.track.addSegment(550, 525, 473, 482);
        // this.track.addSegment(473, 482, 480, 433);
        // this.track.addSegment(480, 433, 619, 397);
        // this.track.addSegment(619, 397, 719, 356);
        // this.track.addSegment(719, 356, 745, 266);
        // this.track.addSegment(745, 266, 736, 179);
        // this.track.addSegment(736, 179, 699, 130);
        // this.track.addSegment(699, 130, 575, 114);
        // this.track.addSegment(575, 114, 460, 123);
        // this.track.addSegment(460, 123, 332, 175);
        // this.track.addSegment(332, 175, 237, 262);
        // this.track.addSegment(237, 262, 191, 403);
        // this.track.addSegment(191, 403, 145, 517);
        // this.track.addSegment(145, 517, 96, 548);
        // this.track.addSegment(96, 548, 75, 538);
        // this.track.addSegment(75, 538, 67, 428);
        // this.track.addSegment(67, 428, 84, 294);
        // this.track.addSegment(84, 294, 103, 191);
        // this.track.addSegment(103, 191, 160, 113);
        // this.track.addSegment(160, 113, 254, 80);
        // this.track.addSegment(254, 80, 374, 65);
        // this.track.addSegment(374, 65, 479, 60);
    
        // this.checkPoints.addSegment(747, 98, 768, 42);
        // this.checkPoints.addSegment(839, 184, 906, 111);
        // this.checkPoints.addSegment(861, 323, 966, 331);
        // this.checkPoints.addSegment(810, 493, 846, 561);
        // this.checkPoints.addSegment(612, 529, 611, 607);
        // this.checkPoints.addSegment(474, 484, 368, 496);
        // this.checkPoints.addSegment(550, 416, 530, 351);
        // this.checkPoints.addSegment(673, 265, 744, 247);
        // this.checkPoints.addSegment(582, 181, 575, 116);
        // this.checkPoints.addSegment(336, 252, 288, 217);
        // this.checkPoints.addSegment(160, 583, 127, 531);
        // this.checkPoints.addSegment(19, 548, 75, 536);
        // this.checkPoints.addSegment(25, 234, 95, 242);
        // this.checkPoints.addSegment(128, 64, 163, 113);
        // this.checkPoints.addSegment(330, 20, 334, 70);

        ////////// track 1 ///////////
        // this.track.addSegment(459, 108, 524, 110);
        // this.track.addSegment(524, 110, 596, 124);
        // this.track.addSegment(596, 124, 657, 143);
        // this.track.addSegment(657, 143, 742, 175);
        // this.track.addSegment(742, 175, 782, 207);
        // this.track.addSegment(782, 207, 806, 240);
        // this.track.addSegment(806, 240, 828, 318);
        // this.track.addSegment(828, 318, 822, 395);
        // this.track.addSegment(822, 395, 801, 460);
        // this.track.addSegment(801, 460, 734, 518);
        // this.track.addSegment(734, 518, 661, 538);
        // this.track.addSegment(661, 538, 570, 543);
        // this.track.addSegment(570, 543, 476, 539);
        // this.track.addSegment(476, 539, 382, 535);
        // this.track.addSegment(382, 535, 290, 511);
        // this.track.addSegment(290, 511, 204, 478);
        // this.track.addSegment(204, 478, 152, 427);
        // this.track.addSegment(152, 427, 145, 371);
        // this.track.addSegment(145, 371, 148, 290);
        // this.track.addSegment(148, 290, 192, 222);
        // this.track.addSegment(192, 222, 253, 157);
        // this.track.addSegment(253, 157, 317, 124);
        // this.track.addSegment(317, 124, 382, 115);
        // this.track.addSegment(382, 115, 462, 109);
        // this.track.addSegment(476, 28, 567, 32);
        // this.track.addSegment(567, 32, 657, 48);
        // this.track.addSegment(657, 48, 758, 77);
        // this.track.addSegment(758, 77, 857, 114);
        // this.track.addSegment(857, 114, 931, 189);
        // this.track.addSegment(931, 189, 948, 296);
        // this.track.addSegment(948, 296, 952, 398);
        // this.track.addSegment(952, 398, 920, 488);
        // this.track.addSegment(920, 488, 881, 573);
        // this.track.addSegment(881, 573, 796, 602);
        // this.track.addSegment(796, 602, 669, 597);
        // this.track.addSegment(669, 597, 558, 598);
        // this.track.addSegment(558, 598, 448, 601);
        // this.track.addSegment(448, 601, 312, 600);
        // this.track.addSegment(312, 600, 189, 570);
        // this.track.addSegment(189, 570, 88, 499);
        // this.track.addSegment(88, 499, 52, 401);
        // this.track.addSegment(52, 401, 54, 287);
        // this.track.addSegment(54, 287, 86, 173);
        // this.track.addSegment(86, 173, 180, 89);
        // this.track.addSegment(180, 89, 300, 48);
        // this.track.addSegment(300, 48, 406, 31);
        // this.track.addSegment(406, 31, 479, 31);

        // this.checkPoints.addSegment(648, 141, 661, 48);
        // this.checkPoints.addSegment(805, 242, 912, 169);
        // this.checkPoints.addSegment(824, 386, 954, 395);
        // this.checkPoints.addSegment(802, 461, 910, 515);
        // this.checkPoints.addSegment(710, 526, 717, 599);
        // this.checkPoints.addSegment(630, 541, 627, 600);
        // this.checkPoints.addSegment(505, 543, 505, 602);
        // this.checkPoints.addSegment(366, 531, 357, 600);
        // this.checkPoints.addSegment(224, 489, 188, 569);
        // this.checkPoints.addSegment(155, 426, 65, 438);
        // this.checkPoints.addSegment(149, 291, 64, 261);
        // this.checkPoints.addSegment(217, 192, 145, 119);
        // this.checkPoints.addSegment(329, 122, 313, 48);
        // this.checkPoints.addSegment(458, 111, 458, 33);
    }

    draw() {
        let bestFitness = 0;

        let liveCars = 0;

        for (let car of this.cars) {
            if (!car.stopped) {
                liveCars++;
                if (this.track.intersects(car)) {
                    car.stopped = true;
                }

                this.checkPoints.update(car);

                car.frames++;

                car.genome.fitness = Math.pow(0.3 * car.frames + 100 * car.score * car.score, 1.5);
                if(car.genome.fitness > bestFitness) {
                    bestFitness = car.genome.fitness;
                }

                if (!globalBestGenome || (car.genome.fitness > globalBestGenome.fitness && car.genome != globalBestGenome.oldGenomeForComparing)) {
                    globalBestGenome = car.genome.copy();
                    globalBestGenome.oldGenomeForComparing = car.genome;
                    windowManager.genome = globalBestGenome;
                }
            }

            car.draw();
        }

        textSize(20);
        fill(150);
        text(bestFitness.toFixed(2), 10, 30);
        text(liveCars, 10, 50);
        text(population.species.length, 10, 70);
        text(generations, 10, 90);

        this.track.draw();
        this.checkPoints.draw();

        this.genome.draw();
    }

    mousePressed() {
        for (let neuron of this.genome.hidden_nodes) {
            if (Math.pow(mouseX - neuron.coords.x, 2) + Math.pow(mouseY - neuron.coords.y, 2) <= Math.pow(neuron_size / 2, 2)) {
                this.dragging = {
                    xOffset: mouseX - neuron.coords.x,
                    yOffset: mouseY - neuron.coords.y,
                    neuron: neuron
                };
                break;
            }
        }
    }

    mouseDragged() {
        if (this.dragging && this.dragging.neuron) {
            this.dragging.neuron.coords.x = mouseX - this.dragging.xOffset;
            this.dragging.neuron.coords.y = mouseY - this.dragging.yOffset;

            if (this.dragging.neuron.coords.x < 2 * neuron_size + genomeWindowOffsetX) {
                this.dragging.neuron.coords.x = 2 * neuron_size + genomeWindowOffsetX;
            } else if (this.dragging.neuron.coords.x > genomeWindowWidth - 2 * neuron_size + genomeWindowOffsetX) {
                this.dragging.neuron.coords.x = genomeWindowWidth - 2 * neuron_size + genomeWindowOffsetX;
            }
            if (this.dragging.neuron.coords.y < neuron_size + genomeWindowOffsetY) {
                this.dragging.neuron.coords.y = neuron_size + genomeWindowOffsetY;
            } else if (this.dragging.neuron.coords.y > genomeWindowHeight - neuron_size + genomeWindowOffsetY) {
                this.dragging.neuron.coords.y = genomeWindowHeight - neuron_size + genomeWindowOffsetY;
            }
        }
    }

    mouseReleased() {
        this.dragging = {};
    }

}