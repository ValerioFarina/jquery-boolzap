const $ = require('jquery');

$(document).ready(function() {
    var user = {
        name: 'Valerio',
        avatar: '_user'
    };

    var contacts = [
        {
            name: 'Marco',
            avatar: '_1',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                }
            ]
        },
        {
            name: 'Fabio',
            avatar: '_2',
            visible: true,
            messages: [
                {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
            ]
        },
        {
            name: 'Samuele',
            avatar: '_3',
            visible: true,
            messages: [
                {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
            ]
        },
        {
            name: 'Martina',
            avatar: '_4',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
            ]
        },
        {
            name: 'Marta',
            avatar: '_5',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai comprato il pane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'No, il panettiere era chiuso',
                    status: 'received'
                }
            ]
        },
        {
            name: 'Andrea',
            avatar: '_6',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Allora che film andiamo a vedere?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Mi dispiace, non ho più voglia di andare al cinema',
                    status: 'received'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Perfetto! Tanto neanche io volevo andarci',
                    status: 'sent'
                }
            ]
        },
        {
            name: 'Antonio',
            avatar: '_7',
            visible: true,
            messages: [
                {
                    date: '15/02/2020 16:32:55',
                    message: 'Buon compleanno Antonio',
                    status: 'sent'
                },
                {
                    date: '15/02/2020 17:50:00',
                    message: 'Grazie!!!',
                    status: 'received'
                }
            ]
        },
        {
            name: 'Luca',
            avatar: '_8',
            visible: true,
            messages: [
                {
                    date: '15/02/2020 7:12:03',
                    message: 'Mi presti la macchina?',
                    status: 'received'
                },
                {
                    date: '15/02/2020 8:10:22',
                    message: 'No',
                    status: 'sent'
                }
            ]
        }
    ];

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

});
