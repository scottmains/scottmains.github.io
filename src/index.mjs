import BadgesWidget from './components/BadgesWidget.mjs';

window.MyBadges = {
    settings: function(options) {
        const myBadges = new BadgesWidget();
        myBadges.configure(options);
        myBadges.initialize();
    }
};
