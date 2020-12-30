const $ = require('jquery');
const dayjs = require('dayjs');
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import {contacts, user} from './partials/js/contacts.js';

$(document).ready(function() {
    var currentIndex;
    var currentContact;

    // we create the template function for the contacts
    var contactHtml = document.getElementById("contact-template").innerHTML;
    var contactTemplate = Handlebars.compile(contactHtml);

    // we create the template function for the messages' container
    var chatHtml = document.getElementById("chat-template").innerHTML;
    var chatTemplate = Handlebars.compile(chatHtml);

    // we create the template function for the messages
    var messageHtml = document.getElementById("message-template").innerHTML;
    var messageTemplate = Handlebars.compile(messageHtml);

    // we add to the header the image and the name of the user
    $('header .user img').attr('src', getImg(user.avatar));
    $('header .user span').text(user.name);

    // we add the contacts in the aside
    addContacts(contacts);

    // we set the first contact as the current contact
    setAsCurrent($('.contact').eq(0));

    // when we click on a contact in the aside
    $('.contact').click(function() {
        // we set this contact as the current contact
        setAsCurrent($(this));
    });

    // every time we insert a character in the search-bar,
    // we filter the contacts in such a way that only the contacts
    // that match the search will be displayed
    $('.search input').keyup(function() {
        var searched = $('.search input').val().trim().toLowerCase();
        filterContacts(searched);
    });

    // when we click on the button besides the search-bar
    $('.search button').click(function() {
        // we empty the input
        $('.search input').val('');
        // we make all the contacts visible
        $('.contact').removeClass('hidden');
    });

    $('#send-message input').keypress(function(e) {
        var key = e.which;
        if (key == 13) {
            var message = $('#send-message input').val();
            sendMessage(message);
            reply();
        }
    });

    $('#send-message i').click(function() {
        var message = $('#send-message input').val();
        sendMessage(message);
        reply();
    });

    // ************************************************ functions ************************************************

    function getImg(imgId) {
        return 'dist/img/avatar' + imgId + '.png';
    }

    function getHour(date) {
        return dayjs(date, 'DD/MM/YYYY H:mm:ss').format('H:mm');
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

    function appendMessage(messageText, messageHour, messageStatus) {
        var placeholders = {
            messageText,
            messageHour,
            messageStatus
        };
        $('.container-messages').append(messageTemplate(placeholders));
    }

    function appendMessages(contact) {
        // we remove the messages' container
        $('.container-messages').remove();

        $('#chat').prepend(chatTemplate({'chat-id': currentIndex}));
        // for each message of the current contact
        contact.messages.forEach((element) => {
            appendMessage(element.message, getHour(element.date), element.status);
            // // we get
            // // - the text of the message
            // // - the hour the message has been sent/received
            // // - the status (sent or received) of the message
            // var placeholders = {
            //     messageText: element.message,
            //     messageHour: getHour(element.date),
            //     messageStatus: element.status
            // };
            // // using these informations, we "build" a corresponding div,
            // // and we append it to the div with id "chat-messages"
            // $('.container-messages').append(messageTemplate(placeholders));
        });
    }

    function setAsCurrent(contact) {
        // we remove the class "current" to every contact
        $('.contact').removeClass('current');
        // we add the class "current" to the given contact
        contact.addClass('current');
        // we put the variable currentIndex equal to the index of the given contact
        currentIndex = contact.index();
        // we put the variable currentContact equal to the element in position currentIndex within the array contacts
        currentContact = contacts[currentIndex];

        // in the header, we add the image and the name of the current contact
        $('.current-contact img').attr('src', getImg(currentContact.avatar));
        $('.current-contact span').text(currentContact.name);

        // in the chat panel, we add the messages of the current contact
        appendMessages(currentContact);
    }

    function matchTheSearch(string, searched) {
        return string.toLowerCase().includes(searched);
    }

    function filterContacts(searched) {
        // for each contact
        $('.contact').each(function() {
            // we recover its name
            var contactName = $(this).children('.info').children('.name').text();
            if (matchTheSearch(contactName, searched)) {
                // if the contact's name match the search, we make the contact visible
                $(this).removeClass('hidden');
            } else {
                // otherwise, we hide the contact
                $(this).addClass('hidden');
            }
        });
    }

    function sendMessage(message) {
        $('#send-message input').val('');
        var now = dayjs();
        var newMessage = {
            date: now.format('DD/MM/YYYY H:mm:ss'),
            message: message,
            status: 'received'
        };
        currentContact.messages.push(newMessage);
        appendMessage(message, getHour(now), 'received');
        // var placeholders = {
        //     messageText: message,
        //     messageHour: getHour(now),
        //     messageStatus: 'received'
        // };
        // $('.container-messages').append(messageTemplate(placeholders));
    }

    function reply() {
        var activeContact = currentContact;
        var activeChat = currentIndex;
        setTimeout(function() {
            var now = dayjs();
            var newMessage = {
                date: now.format('DD/MM/YYYY H:mm:ss'),
                message: 'ok',
                status: 'sent'
            };
            activeContact.messages.push(newMessage);
            if ($('.container-messages').attr('id') == activeChat) {
                appendMessage('ok', getHour(now), 'sent');
                // var placeholders = {
                //     messageText: 'ok',
                //     messageHour: getHour(now),
                //     messageStatus: 'sent'
                // };
                // $('.container-messages').append(messageTemplate(placeholders));
            }
        }, 2000);
    }
});
