/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Badass Woman Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a badass woman fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const data = [
    'A talented mathematician born in London on December 10, 1815, Augusta Ada Lovelace, is considered the first computer programmer.',
    'Mae Carol Jemison, born October 17, 1956, became the first African American woman to travel in space orbit aboard the Space Shuttle Endeavour.',
    'Amal Clooney, born Amal Alamuddin, is a lawyer specializing in human rights. Amal has many notable cases, such as recognition of the Armenian Genocide, arguing for the release of Philippine president Gloria Macapagal-Arroya from detention, and representing clients such as Julian Assange, the founder of WikiLeaks. She speaks 3 languages, studied at Oxford and New York University School of law, and is married to actor George Clooney.',
    'Simone Arianne Biles, born March 14, 1997, is the most decorated American gymnast, with 19 Olympic and World Championship medals. Simone is the first female African-American all-around world champion and is recognized as One of the Most Influential People in the World by Time magazine.',
    'Malala Yousafzai, born July 12, 1997 in Mingora, Pakistan, is the youngest person ever to win a Nobel Peace Prize. She was shot in the head by a Taliban member on October 9, 2012 while taking the bus home from school, but she did not let that stop her from advocating for girl\'s education. The United Nations named July 12th as World Malala Day',
    'Mikalya Holmgren, born February 5, 1995, is the first woman with Down syndrome to compete in the Miss Minnesota USA pageant, where she won the spirit award and director\'s award. She\'s competed in gymnastics in the Special Olympics and in 2015 she won the Junior Miss Amazing competition.',
    'Tarana Burke is a civil rights activist who coined the phrase Me Too to raise awareness of widespread sexual abuse and harassment. Tarana was named one of Time magazines Person of the Year recipients in 2017.',
    'Physicist Katharine Blodgett was the first woman to receive her Ph.D. at Cambridge University and to be hired by General Electric. She contributed to military research on gas masks, smoke screens, and technology for deicing airplanes during the second World War. She is best known for her invention of low-reflectance glass, which is used in cameras, eyeglasses, car windshields and computer screens',
    'Michelle LaVaugh Robinson Obama, born January 17, 1964, is the first African American First Lady. Michelle graduated from Princeton and Harvard Law. She championed many initiatives as First Lady, including advocating on behalf of military families, LGBT rights, and reducing childhood obesity. Everybody wants to be Michelle when they grow up, she\'s just that cool.',
    'Joan Ruth Bader Ginsburg, born March 15, 1933, is the second female justice named to the Supreme Court. She graduated from Cornell University and Harvard Law School and co-founded the Women\'s Right\'s Project at the American Civil Liberties Union. The Notorious RBG is one of Time magazine\'s 100 most influential people and she even has a species of praying mantis named after her.',
    'Elizabeth Marie Tall Chief, born January 24, 1925, is America\'s first prima ballerina, and the first Native American woman to hold this title. Known for her firey, passionate and technically precise performances around the world and on TV, she challenged ethnic stereotypes in the ballet world and danced into our hearts.',
    'Maya Angelou, born April 4, 1928, was a vibrant poet, memoirist, and civil rights activist. Her 1970 book titled I know why the caged bird sings received international recognition, drawing attention to sexual abuse and women\'s personal lives. In 1993, she recited her poem entitled on the pulse of morning at President Bill Clinton\'s inauguration, making her the first female poet to hold this honor. ',
    'Wilma Mankiller, born November 18, 1945, was a women\'s rights activist and the first woman to serve as the principal Chief of the Cherokee nation. She earned degrees at Flaming Rainbow University and University of Arkansas. She won numerous awards for her work, such as the Presidential Medal of Freedom, and is a member of the National Women\'s Hall of Fame.',
    'Ava Marie DuVernay, born August 24, 1972, is a prominent filmmaker. She earned a degree from the University of California, Los Angeles. In 2012, she became the first African-American woman to win the U.S. Directing Award for her film the Middle of Nowhere. On top of many presitious awards, she\'s so cool she even has a Barbie made in her likeness.',
    'Patsy Matsu Takemoto Mink, born December 6, 1927, was the first Asian American woman elected to Congress. She earned degrees from the University of Hawaii and University of Chicago Law School. She went on to be a principle author of the Title 9 Amendment to Higher Education, and she introduced the Childhood Education and Women\'s Educational Equity Acts. She served 6 terms in Congress.',
    'Linda Sasour is a civil rights activist. Linda was one of three women co-chairing the 2017 women\'s march, a worldwide protest centered on human rights. She fought to protect the rights of Muslim Americans after the tragic events of September 11, 2001, as well as helping to organize Black Lives Matter protests. She was named one of Time magazine\'s 100 most influential people in 2017. ',
    'Nancy Marie Lopez, born January 6, 1957, was a professional golfer with over 50 professional wins and three major championship titles. She attended the University of Tulsa. Nancy is considered to be one of the best female golf players, and continues to be a spokesperson for women\'s and Latino issues. ',
    'Grace Brewster Murray Hopper, born December 9, 1906, was a computer scientist and member of the US Naval Reserves. Grace developed one of the first compiler tools and spearheaded compiler-based programming languages. She has won numerous awards, such as the Presidential Medal of Honor, and dozens of honorary degrees from universities. She was famed for the metal wires she passed out as a visual aid into her talks. ',
    'Ameila Mary Earheart, born July 24, 1897, was the first woman to fly solo across the Atlantic Ocean. As a child, she climbed trees and hunted rats with a rifle. She was an educator, an engineer, a writer and an advocate for women in aviation.'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
