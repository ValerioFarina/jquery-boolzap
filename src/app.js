const $ = require('jquery');
const dayjs = require('dayjs');
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import {contacts, user} from './partials/js/contacts.js';

$(document).ready(function() {

    // we add to the header the image and the name of the user
    $('header .user img').attr('src', getImg(user.avatar));
    $('header .user span').text(user.name);

    // we create the template function for the contacts
    var contactHtml = document.getElementById("contact-template").innerHTML;
    var contactTemplate = Handlebars.compile(contactHtml);

    // we add the contacts in the aside
    addContacts(contacts);

    // we put the current contact equal to the first contact
    var currentIndex = 0;
    var currentContact = contacts[currentIndex];

    // in the aside, we add the class "current" to the div corresponding to the current contact
    $('.contact').eq(currentIndex).addClass('current');

    // in the header, we add the image and the name of the current contact
    $('.current-contact img').attr('src', getImg(currentContact.avatar));
    $('.current-contact span').text(currentContact.name);

    // we create the template function for the messages
    var messageHtml = document.getElementById("message-template").innerHTML;
    var messageTemplate = Handlebars.compile(messageHtml);

    // in the chat panel, we add the messages of the current contact
    addMessages(currentContact);

    // when we click on a contact in the aside
    $('.contacts').on('click', '.contact', function() {
        // we set this contact as the current contact
        setAsCurrent($(this));

        // in the header, we add the image and the name of the current contact
        $('.current-contact img').attr('src', getImg(currentContact.avatar));
        $('.current-contact span').text(currentContact.name);

        // in the chat panel, we add the messages of the current contact
        addMessages(currentContact);
    });

    var searched = '';

    // every time we insert a character in the search-bar,
    // we filter the contacts in such a way that only the contacts
    // that match the search will be displayed
    $('.search input').keyup(function() {
        filterContacts();
    });

    // when we click on the button besides the search-bar
    $('.search button').click(function() {
        // we empty the input
        $('.search input').val('');
        searched = '';
        // we make all the contacts visible
        $('.contact').removeClass('hidden');
    });

    // ********************* functions *********************

    function getImg(imgId) {
        return 'dist/img/avatar' + imgId + '.png';
    }

    function addContacts(contacts) {
        // for each contact,
        contacts.forEach((contact) => {
            // we get
            // - the image of the contact
            // - the name of the contact
            // - the last message received/sent by the contact
            var placeholders = {
                imgUrl: getImg(contact.avatar),
                name: contact.name,
                lastMessage: contact.messages[contact.messages.length - 1].message
            };
            // using these informations, we "build" a corresponding html element,
            // and we append it to the div with class "contacts"
            $('.contacts').append(contactTemplate(placeholders));
        });
    }

    function addMessages(contact) {
        // we empty the chat panel
        $('#chat-messages').empty();
        // for each message of the current contact
        contact.messages.forEach((element) => {
            // we get
            // - the text of the message
            // - the hour the message has been sent/received
            // - the status (sent or received) of the message
            var placeholders = {
                messageText: element.message,
                messageHour: dayjs(element.date, 'DD/MM/YYYY H:mm:ss').format('H:mm'),
                messageStatus: element.status
            };
            // using these informations, we "build" a corresponding div,
            // and we append it to the div with id "chat-messages"
            $('#chat-messages').append(messageTemplate(placeholders));
        });
    }

    function setAsCurrent(contact) {
        $('.contact').removeClass('current');
        contact.addClass('current');
        currentIndex = contact.index();
        currentContact = contacts[currentIndex];
    }

    function filterContacts() {
        searched = $('.search input').val().trim().toLowerCase();
        $('.contact').each(function() {
            if ($(this).children('.info').children('.name').text().toLowerCase().includes(searched)) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });
    }

});
