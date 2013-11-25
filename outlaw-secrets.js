
Secrets = new Meteor.Collection('secrets');

if (Meteor.isClient) {

    Template.hello.greeting = function () {
        return "Welcome to Outlaw Secrets.";
    };


    Template.theSecrets.all = function () {
        return Secrets.find();
    };

    Template.theSecrets.names = function () {
        var secretNames = Secrets.find({}, {fields: {secretName:1}}).fetch();
        secretNames = _.uniq(secretNames, function( obj ) { return obj.secretName; });
        return _.shuffle(secretNames);
    };

    Template.theSecrets.preserve(['.wrong', '.correct']);


    Template.secretsForm.events({
        'submit form' : function (event) {
            event.preventDefault();

            var secretName = event.target.secretName.value,
                theSecret = event.target.theSecret.value;

            if ( secretName !== "" && theSecret !== "" ) {
                Secrets.insert({
                    secretName: secretName,
                    theSecret: theSecret
                });

                event.target.secretName.value = "";
                event.target.theSecret.value = "";
            }
        }
    });


    $(document).on('click', '.secretList a', function(event) {
        event.preventDefault();
        var $that = $(this);
        $('.secretNameListWrapper').show();
        $(document).off('click', '.secretNameList a');
        $(document).on('click', '.secretNameList a', function(event) {
            event.preventDefault();
            event.stopPropagation();
            // console.log( $that.parent().data().whoisit );

            if ( $(this).text() === $that.parent().data().whoisit ) {
                console.log( 'Correct!' );
                $('.secretNameListWrapper').hide();
                $that.removeClass('wrong').addClass('correct');
            } else {
                console.log( 'Wrong!' );
                $('.secretNameListWrapper').hide();
                $that.removeClass('correct').addClass('wrong');
            }
        });
    });

}


if (Meteor.isServer) {
    Meteor.startup(function () {
    });
}
