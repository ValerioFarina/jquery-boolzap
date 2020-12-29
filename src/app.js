const $ = require('jquery');
const dayjs = require('dayjs');
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import {contacts, user} from './partials/js/contacts.js'

$(document).ready(function() {

    $('header .user img').attr('src', 'dist/img/avatar' + user.avatar + '.png');
    $('header .user span').text(user.name);

    var contactHtml = document.getElementById("contact-template").innerHTML;
    var contactTemplate = Handlebars.compile(contactHtml);

    contacts.forEach((contact) => {
        var placeholders = {
            imgUrl: 'dist/img/avatar' + contact.avatar + '.png',
            name: contact.name,
            lastMessage: contact.messages[contact.messages.length - 1].message
        };

        $('.contacts').append(contactTemplate(placeholders));
    });

    var currentIndex = 0;

    var currentContact = contacts[currentIndex];

    $('.contact').eq(currentIndex).addClass('current');

    $('.current-contact img').attr('src', 'dist/img/avatar' + currentContact.avatar + '.png');

    $('.current-contact span').text(currentContact.name);

    var messageHtml = document.getElementById("message-template").innerHTML;
    var messageTemplate = Handlebars.compile(messageHtml);

    currentContact.messages.forEach((element) => {
        var placeholders = {
            messageText: element.message,
            messageHour: dayjs(element.date).format('H:mm'),
            messageStatus: element.status
        };

        $('#chat-messages').append(messageTemplate(placeholders));
    });

    $('.contacts').on('click', '.contact', function() {
        $('.contact').removeClass('current');

        $(this).addClass('current');

        currentIndex = $(this).index();

        currentContact = contacts[currentIndex];

        $('.current-contact img').attr('src', 'dist/img/avatar' + currentContact.avatar + '.png');

        $('.current-contact span').text(currentContact.name);

        $('#chat-messages').empty();

        currentContact.messages.forEach((element) => {
            var placeholders = {
                messageText: element.message,
                messageHour: dayjs(element.date, 'DD/MM/YYYY H:mm:ss').format('H:mm'),
                messageStatus: element.status
            };

            $('#chat-messages').append(messageTemplate(placeholders));
        });
    });

    var searched = '';

    $('.search input').keyup(function() {
        searched = $('.search input').val().trim().toLowerCase();
        $('.contact').each(function() {
            if ($(this).children('.info').children('.name').text().toLowerCase().includes(searched)) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });
    });

    $('.search button').click(function() {
        $('.search input').val('');
        searched = '';
        $('.contact').removeClass('hidden');
    });

});
