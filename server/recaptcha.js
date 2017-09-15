Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: <Private Key>
    });
});

Meteor.methods({
    formSubmissionMethod: function(formData, captchaData) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

        if (!verifyCaptchaResponse.success) {
            console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
        } else{
            console.log('reCAPTCHA verification passed!');
            Email.send({
            	to: <My email>,
				from: formData.sender,
				subject: formData.reason,
				text: formData.content
            });
        }
    }
});