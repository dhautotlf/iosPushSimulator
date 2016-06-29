$(document).ready(function() {
    $('#alert-container-info').hide();
    $('#notification-text').val('Notification from IOS PUSH');
    $('#notification-badge').val(0);
    $('#notification-restaurantId').val(0);

    var actions = ['RESERVATION_CREATE', 'RESERVATION_CANCEL'];
    var environments = ['PROD'];

    $.ajax({
        type: 'GET',
        url: '/platforms',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function(data) {
        $.each(data, function(key, value) {
            $('#notification-platforms')
                .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });
    });

    $.each(actions, function(key, value) {
        $('#notification-action')
            .append($("<option></option>")
                .attr("value", value)
                .text(value));
    });

    $.each(environments, function(key, value) {
        $('#notification-environment')
            .append($("<option></option>")
                .attr("value", value)
                .text(value));
    });

    $("#send-notification").click(function() {
        $.ajax({
            type: 'POST',
            url: '/notification',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(_generateData()),
        }).complete(function(err) {
            $('#alert-container-info').show();
            $('#alert-container-info').text(err.responseText);
        });
    });

    function _generateData() {
        var payload = {
            platform: $('#notification-platforms').val(),
            token: $('#device-token').val(),
            text: $('#notification-text').val(),
            action: $('#notification-action').val(),
            badge: $('#notification-badge').val(),
            restaurantId: $('#notification-restaurantId').val(),
            environment: $('#notification-environment').val(),
            payload: $('#notification-payload').val() || ''
        };
        return payload;
    }
});
