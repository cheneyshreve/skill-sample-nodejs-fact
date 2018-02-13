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
    'A talented mathematician born in 1815, Augusta Ada Lovelace, is considered the first computer programmer.',
    'Mae Carol Jemison, born in 1956, was the first African American woman to travel in space orbit aboard the Space Shuttle Endeavour.',
    'Amal Clooney is a human rights lawyer. She argued for recognition of the Armenian Genocide, she speaks 3 languages, studied at Oxford and New York University School of law, and the actor George Clooney is married to her.',
    'Simone Biles, born in 1997, is the most decorated American gymnast, with 19 Olympic and World Championship medals. She is the first female African-American all-around world champion and is recognized as One of the Most Influential People in the World by Time magazine.',
    'Malala Yousafzai, born in 1997, is the youngest recipient of the Nobel Peace Prize. She was shot in the head by a Taliban member in 2012, but she did not let that stop her from advocating for girl\'s education. July 12th is World Malala Day',
    'Mikalya Holmgren, born in 1995, is the first woman with Down syndrome to compete in the Miss Minnesota USA pageant. She\'s competed in gymnastics in the Special Olympics and in 2015 she won the Junior Miss Amazing competition.',
    'Tarana Burke is a civil rights activist who coined the phrase Me Too to raise awareness of widespread sexual abuse and harassment. Tarana was named one of Time magazines Person of the Year recipients in 2017.',
    'Physist Katharine Blodgett was the first woman to receive her Ph.D. from Cambridge University. She was a best known for her invention of low-reflectance glass, which is used in camera lenses, eyeglasses, car windshields, and computer screens.',
    'Michelle Obama, born in 1964, is an accomplished lawyer, writer, and the first African American First Lady. As First Lady, she advocated for low income Americans, military families, LGBT rights, reducing childhood obesity, and she did it all in style. Everybody wants to be like Michelle when they grow up.',
    'Joan Ruth Bader Ginsburg, born in 1933, is the second female justice named to the Supreme Court. She co-founded the Women\'s Right\'s Project at the American Civil Liberties Union. The Notorious RBG even has a species of praying mantis named after her.',
    'Elizabeth Marie Tall Chief, born in 1925, is America\'s first prima ballerina, and the first Native American woman to hold this title. She was a passionate and technically precise performer, and she challenged ethnic stereotypes in the ballet world.',
    'Maya Angelou, born in 1928, was a writer and civil rights activist. Her book titled I know why the caged bird sings received international recognition, drawing attention to sexual abuse and women\'s personal lives. She read one of her poems at President Bill Clinton\'s inauguration, making her the first female poet to hold this honor. ',
    'Wilma Mankiller, born in 1945, was a women\'s rights activist and the first contemporary woman to serve as the principal Chief of the Cherokee nation. She was awarded the Presidential Medal of Freedom for her work and she is a member of the National Women\'s Hall of Fame.',
    'Ava DuVernay, born in 1972, is a prominent filmmaker. In 2012, she became the first African-American woman to win the U.S. Directing Award for her film the Middle of Nowhere. She\'s so cool she even has a Barbie made in her likeness.',
    'Patsy Mink, born in 1927, was the first Asian American woman elected to Congress. She was a principle author of the Title 9 Amendment to Higher Education, she introduced the Childhood Education and Women\'s Educational Equity Acts, and she served 6 terms in Congress.',
    'Linda Sasour is a civil rights activist. Linda was one of three women co-chairing the 2017 women\'s march, a worldwide protest centered on human rights. She advocates for the rights of Muslim Americans and supports the Black Lives Matter movement. She was named one of Time magazine\'s 100 most influential people. ',
    'Nancy Lopez, born in 1957, is considered one of the best professional female golfers. She has over 50 professional wins and three major championship titles, and she is and a strong advocate for women\'s rights.',
    'Grace Hopper, born in 1906, was a computer scientist and member of the US Naval Reserves. Grace developed one of the first compiler tools and spearheaded compiler-based programming languages. She was awarded the Presidential Medal of Honor, dozens of honorary university degrees, and is remembered for the metal wires she passed out as a visual aid during her talks. ',
    'Ameila Earhart, born in 1897, was the first woman to fly alone across the Atlantic Ocean. As a child, she climbed trees and wielded a rifle. She was an educator, an engineer, a writer and an advocate for women in aviation.',
    'Beyonce Knowles-Carter, born in 1981, is a world famous performer. A singer, song writer, dancer, and actress, she is one of the best-selling music artists in history. She has 22 grammy awards, been on Time magazines 100 most infulential people list multiple times, and the wrapper Jay-Z is married to her. ',
    'Frida Kahlo, born in 1607, was an uncompromising Mexican artist. Impacted by polio as a child, and a traffic accident as a young adult, she did not let that stop her. Her paintings have earned her a place in art history and she remains an icon for feminist movements. ',
    'Hillary Clinton, born in 1947, is a politician and is the first female candidate nominated for president by the Democratic Party. A former First Lady, Senator, and Secretary of State, she won the popular vote in 2016 and showed us all how to stand up to bullies with grace and intelligence.',
    'Trisha Shetty is the founder and CEO of SheSays, an NGO that aims to empower women in India to take action against sexual harassment. She is one of the United Nations Sustainable Development Goals Young Leaders.',
    'Rita Kimani, a computer scientist and co-founder of Farm Drive in Kenya. Farm Drive helps connect underserved farmers to affordable credit. Rita is one of the United Nation\'s Sustainable Development Goals Young Leaders.',
    'Edda Hamar, from Australia and Iceland, co-founded Undress Runways and launched the Naked Mag in 2014 to educate and inspire people about sustainable fashion without compromising on style. She is one of the United Nation\'s Sustainable Development Goals Young Leaders.',
    'Safaath Zahir from the Repbulic of Maldives is a women\'s rights activist who leads Women on Boards, an non-profit promoting gender diversity in the workplace. Safaath is working to get more women in government and policy positions and she is one of the United Nation\'s Sustainable Development Goals Young Leaders.',
    'Carolina Medina is a co-founder and CEO of Agruppa. Based in Columbia, this organization leverages mobile phone technology to organize small businesses into groups so farmers can provide more afforable prices to customers. She is one of the United Nation\'s Sustainable Development Goals Young Leaders.',
   'Shougat Nazbin Khan from Bangladesh founded her own school, H.A. Digital School and College, to reach underserved communities and empower women. The school has a majority female faculty, the school has over 600 students. Shougat won the Green Talent award in 2015 for her low-cost solar PV irrigation system and she is one of the United Nation\'s Sustainable Development Gloals Young Leaders.',
   'Samar Mezghanni is a Tunisian writer who capitivates audiences with her storytelling. She is in the Guiness Book of world records for being the youngest and most prolific writer in the world, and she has been named one of the most powerful Arab women. Encouraging young people to write about the world that they want to see, Samir is one of United Nation\'s Sustainable Development Gloals Young Leaders.',
   'Nikki Fraser stands up for the rights of indigenous women in Canada, and worldwide, bringing to light the countless lost women; some from her own family. A mother of two, she is the Youth Representative from British Columbia Native Women\'s Association and National Youth Representative for the Native Women’s Association of Canada. She\'s interviewed Prime Minister Justin Trudeau and she is one of United Nation\'s Sustainable Development Gloals Young Leaders.',
   'Tere Garcia is the president of Liter of Light in Mexico, an organization that repurposes plastic soda bottles to create sustainable light sources. Working with organizations like the World Bank and MTV Agents of Change, she encourages young people to enact positive change in society. She is one of United Nation\'s Sustainable Development Gloals Young Leaders.',
   'Sheryl Sandberg is a technology executive, author, and philanthropist. Currently the chief operating officer of Facebook, she is the founder of the organization Lean In. She has authored three books aimed at helping women advance in the workforce, she frequently appears in listings of most influential people, and she contributed more than a hundred million dollars in Facebook stock to fund charitable efforts through the Sheryl Sandberg and Dave Goldberg Family Foundation.',
   'Kimberly Bryant is a technologist, engineer, and the founder of Black Girls Code. Knowing the isolation that women face in science and tech, especially minority women, Kimberly wanted a better environment for her daughter and others to learn in, so she made one. Kimberly has been recognized as a White House champion of Change for Tech inclusion and voted one of the 25 most influential African Americans in Technolgy by Business Insider.',
   'Gail Carmichael, as she describes herself on her blog, is a computer scientist, educator and change maker. Currently the External Education team lead at Shopify, she helped to co-fund Carleton university\'s Women in Science and Engineering initiative, she is a long time contributor to the Grace Hopper Celebration of Women in Computing, and she is passionate about sharing the joy of computer science with others.',
   'Erica Baker is an engineer and technology executive, renowned for her support for diversity and inclusion in tech. Erica has worked for tech companies such as Google, Slack, Kickstarter and Patreon. At Google she created an internal spreadsheet where employees could disclose their salaries, sparking discussion on gender and enthnicity disparities in pay, helping some of her colleagues to get raises. She carries this passion for equitable pay forward through initiatives such as the hastag Real Diversity Numbers, a Twitter movement to encourage companies to report about diversity.',
   'Tracy Chou is a software engineer with experience at companies such as Google, Facebook, Quora, and RocketFuel, among others. She is recognized as an advocate for diversity in tech. Tracy co-founded Project Include with 7 other women. She created a public Github repository where companies can report their diversity numbers and is credited as being influential in getting high profile tech companies like Microsoft to start reporting their diversity numbers.',
   'Gwynne Shotwell is an engineer and excutive, currently the President and Chief Operating Officer at SpaceX, a space exploration company. When she\'s not helping deliver astronauts to the International Space Station, she participates in a variety of science, technology, math and engineering initiatives. In 2012, she was added to the Women in Technology Hall of Fame.',
   'Claire Boonstra of the Netherlands, in her words on her website, describes herself as on a mission to unleash the potential of humanity. A mother of three, and former glider pilot, after co-founding Layer, a technology education company, she founded Operation Education, which aims to revolutionize education. She has received serveral nice titles, as she calls them, such as being named a Young Global Leader by the World Economic Forum.',
   'Jane Goodall is a British primatologist and anthropologist best known for her study of chimpanzees and advocacy on animal welfare issues. She was made a Dame, she\'s a United Nation\'s Messenger for Peace, and she has received dozens of awards for her research and advocacy. She even has a plague on the Tree of Life at Walt Disney World\'s Animal Kingdom theme park.',
   'Ann Dunwoody achieved a lot of firsts for women in the U.S. military. She was the first woman to command a battalion in the 82nd Airborne Division, the first female General officer at Fort Bragg, the first woman to command the Combined Arms Support Command at Fort Lee, and the first woman in the U.S. military to achieve the rank of 4 star General. On top of many military honors, she fought for sexual assault prevention in the U.S. Army.',
   'Harriet Tubman was an abolisionist, humanitarian, and a spy during the American Civil War. Born a slave, she escaped and helped others to escape through her involvement with the Undeground Railroad. After the war, she advocated for women\'s right to vote. In 2016, the former U.S. Secretary of the Treasury proposed to put Harriet on the front of the 20 dollar bill, however, this was blocked by politician Steve Mnuchin. Come on Steve, we are ready for Harriet.',
   'Noella Musunka is a model, philanthropist, and founder of the organization Malakia, which provides free education to disadvantaged girls in the Democratic Republic of Congo. Malakia means angel in Swahili, and to hundreds of girls, Noealla is just that.',
   'Dorothy Hodgkin was British chemist who was awarded the Nobel Prize for her work in understanding the structure of penicillin. She advanced the technique of X-ray crystallography, a method that scientists use to study the structure of crystals.',
   'Rosa Parks was a pivotal figure in the Civil Rights Movement. Famous for her refusal to give up her seat to a white passenger when the U.S. was still practicing racial segregation in 1955, she became an international symbol. Her arrest sparked a bus boycott that lasted over a year until the city of Montgomery finally repealed its law requiring segregation on public buses. Rosa was recognized by the U.S. Congress as the first lady of civil rights, she was awarded the Presidental Medal of Freedom, the Congressional Gold Medal, the Spingarn Medal, among others, and she is commenorated a statue in the National Statuary Hall.',
   'Eva Peron, or Evita, as she was known, was a former First Lady of Argentina, known for her fight to end poverty and empower women. When she was turned away from the charity group traditionally led by the First Lady due to her impoverished upbringing and career as an actress, she started her own foundation, beginning the funding with her own money. Her foundation went on to employ thousands of workers, and built entire communities that still exist today.'

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
