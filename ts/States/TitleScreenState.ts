/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../Utils/GameSettings.ts"/>
module States
{
    export class TitleScreenState extends Phaser.State
    {
        game:Phaser.Game;

        START_BUTTON1:Phaser.Key;
        START_BUTTON2:Phaser.Key;
        bg: Phaser.TileSprite;
        //enter: Phaser.Sprite;

        blinkingText: Phaser.Text;

        s1:Phaser.Sound;

        titleAni: Phaser.Sprite;

        squeaks: Array<Phaser.Sound>;

        create() {


            this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_neu");

            // blinking enter
            /*
            this.enter = this.game.add.sprite(this.game.width * 0.92, this.game.height * 0.86, "enter");
            this.enter.anchor.setTo(0.5,0.5);
            this.enter.scale.x = 0.40;
            this.enter.scale.y = 0.40;
            this.enter.alpha = 0;
            this.game.add.tween(this.enter).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            */

            var umlaut = encodeURIComponent('ü');
            var line1 = 'Beliebige Taste dr'+decodeURIComponent(umlaut)+'cken!';
            var style = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_RED,40);
            this.blinkingText = this.game.add.text(0, 0, line1, style);
            this.blinkingText.anchor.set(0.5,0.5);
            //this.blinkingText.height = this.blinkingText.height * 2;
            //this.blinkingText.width = this.blinkingText.width * 0.6;
            this.blinkingText.wordWrap = true;
            this.blinkingText.wordWrapWidth = this.blinkingText.width * 0.7;
            var padding = 20;
            this.blinkingText.x = (this.game.width - this.blinkingText.width/2)-padding;
            this.blinkingText.y = (this.game.height - (this.blinkingText.height/2))-padding;
            this.blinkingText.alpha = 0;
            this.game.add.tween(this.blinkingText).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

            this.s1 = this.game.add.audio('bg_old', 1, true);
            this.s1.play();

            this.squeaks = [
                this.game.add.audio('squeak', 1,false),
                this.game.add.audio('squeak2',1,false)
            ];

            this.showInfo();

            this.START_BUTTON1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.START_BUTTON1.onDown.add(TitleScreenState.prototype.buttonPressed, this);
            this.START_BUTTON2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.START_BUTTON2.onDown.add(TitleScreenState.prototype.buttonPressed, this);

            // arduino board keys
            var buttonA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            buttonA.onDown.add(TitleScreenState.prototype.buttonPressed, this);
            var buttonB = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
            buttonB.onDown.add(TitleScreenState.prototype.buttonPressed, this);
            var buttonC = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
            buttonC.onDown.add(TitleScreenState.prototype.buttonPressed, this);
            var buttonD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            buttonD.onDown.add(TitleScreenState.prototype.buttonPressed, this);


            this.titleAni = this.game.add.sprite(this.game.width/2, this.game.height/2, 'TITLE_ANIM');
            this.titleAni.anchor.set(0.5,0.5);
            this.titleAni.scale.x = 0.3;
            this.titleAni.scale.y = 0.3;
            this.titleAni.animations.add("TITLE_ANIM"); // whole sheet = move animation
            this.titleAni.animations.play("TITLE_ANIM", 8, true); // true -> loop forever

        }

        showInfo()
        {
            document.getElementById('infolink').style.display = 'block';
        }

        hideInfo()
        {
            document.getElementById('infolink').style.display = 'none';
        }

        buttonPressed() {
            this.sound.stopAll();
            this.hideInfo();
            this.squeaks[Math.floor(Math.random()* 2)].play();
            this.game.tweens.removeFrom(this.blinkingText); // remove tween
            this.game.state.start("MenuState");
        }

    }
}
