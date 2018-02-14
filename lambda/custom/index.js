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
    'Malala Yousafzai, born in 1997, is the youngest recipient of the Nobel Peace Prize. She was shot in the head by a Taliban member in 2012, but she did not let that stop her from advocating for girl\'s education. July 12th is recognized by the United Nation\'s as World Malala Day',
    'Mikalya Holmgren, born in 1995, is the first woman with Down syndrome to compete in the Miss Minnesota USA pageant. She\'s competed in gymnastics in the Special Olympics and in 2015 she won the Junior Miss Amazing competition.',
    'Tarana Burke is a civil rights activist who coined the phrase Me Too to raise awareness of widespread sexual abuse and harassment. Tarana was named one of Time magazines Person of the Year recipients in 2017.',
    'Physist Katharine Blodgett was the first woman to receive her Ph.D. from Cambridge University. She is best known for her invention of low-reflectance glass, which is used in camera lenses, eyeglasses, car windshields, and computer screens.',
    'Michelle Obama, born in 1964, is an accomplished lawyer, writer, and the first African American First Lady. As First Lady, she advocated for low income Americans, military families, LGBT rights, reducing childhood obesity, and she did it all in style.',
    'Joan Ruth Bader Ginsburg, born in 1933, is the second female justice named to the Supreme Court. She co-founded the Women\'s Right\'s Project at the American Civil Liberties Union. The Notorious RBG even has a species of praying mantis named after her.',
    'Elizabeth Marie Tall Chief, born in 1925, is America\'s first prima ballerina, and the first Native American woman to hold this title. She was a passionate and technically precise performer, and she challenged ethnic stereotypes in the ballet world.',
    'Maya Angelou, born in 1928, was a writer and civil rights activist. Her book titled I know why the caged bird sings received international recognition, drawing attention to sexual abuse and women\'s personal lives. She read one of her poems at President Bill Clinton\'s inauguration, making her the first female poet to hold this honor. ',
    'Wilma Mankiller, born in 1945, was a women\'s rights activist and the first contemporary woman to serve as the principal Chief of the Cherokee nation. She was awarded the Presidential Medal of Freedom for her work and she is a member of the National Women\'s Hall of Fame.',
    'Ava DuVernay, born in 1972, is a prominent filmmaker. In 2012, she became the first African-American woman to win the U.S. Directing Award for her film the Middle of Nowhere. She\'s so cool she even has a Barbie made in her likeness.',
    'Patsy Mink, born in 1927, was the first Asian American woman elected to Congress. She was a principle author of the Title 9 Amendment to Higher Education, she introduced the Childhood Education and Women\'s Educational Equity Acts, and she served 6 terms in Congress.',
    'Linda Sasour is a civil rights activist. Linda was one of three women co-chairing the 2017 women\'s march, a worldwide protest centered on human rights. She advocates for the rights of Muslim Americans and supports the Black Lives Matter movement. She was named one of Time magazine\'s 100 most influential people. ',
    'Nancy Lopez, born in 1957, is considered one of the best professional female golfers. She has over 50 professional wins and three major championship titles, and she is and a strong advocate for women\'s rights.',
    'Grace Hopper, born in 1906, was a computer scientist and member of the US Naval Reserves. Grace developed one of the first compiler tools and spearheaded compiler-based programming languages. She was awarded the Presidential Medal of Honor, dozens of honorary university degrees, and is remembered for the metal wires she passed out as a visual aid during her talks. ',
    'Ameila Earhart, born in 1897, was the first woman to fly alone across the Atlantic Ocean. As a child, she climbed trees and learned to shoot a rifle. She was an educator, an engineer, a writer and an advocate for women in aviation.',
    'Beyonce Knowles-Carter, born in 1981, is a world famous performer. A singer, song writer, dancer, and actress, she is one of the best-selling music artists in history. She has 22 grammy awards, she\'s been on Time magazines 100 most infulential people list multiple times, and the wrapper Jay-Z is married to her. ',
    'Frida Kahlo, born in 1607, was a famous Mexican artist. Impacted by polio as a child, and a traffic accident as a young adult, she did not let that stop her. Her paintings have earned her a place in art history and she remains an icon for feminist movements.',
    'Hillary Clinton, born in 1947, is a politician and is the first female candidate nominated for president by the Democratic Party. A former First Lady, Senator, and Secretary of State, she won the popular vote in 2016 and showed us all how to stand up to bullies with grace and intelligence.',
    'Trisha Shetty is the founder and CEO of SheSays, an NGO that aims to empower women in India to take action against sexual harassment. She is one of the United Nations Sustainable Development Goals Young Leaders.',
    'Rita Kimani, a computer scientist and co-founder of Farm Drive in Kenya. Farm Drive helps connect underserved farmers to affordable credit. Rita is one of the United Nation\'s Sustainable Development Goals Young Leaders.',
    'Edda Hamar, from Australia and Iceland, co-founded Undress Runways and launched the Naked Mag in 2014 to educate and inspire people about sustainable fashion without compromising on style. She is one of the United Nation\'s Sustainable Development Goals Young Leaders.',
    'Safaath Zahir from the Repbulic of Maldives is a women\'s rights activist who leads Women on Boards, an non-profit promoting gender diversity in the workplace. Safaath is working to get more women in government and policy positions and she is one of the United Nation\'s Sustainable Development Goals Young Leaders.',
    'Carolina Medina is a co-founder and CEO of Agruppa. Based in Columbia, this organization leverages mobile phone technology to organize small businesses into groups so farmers can provide more afforable prices to customers. She is one of the United Nation\'s Sustainable Development Goals Young Leaders.',
   'Shougat Nazbin Khan from Bangladesh founded her own school, H.A. Digital School and College, to reach underserved communities and empower women. The school has a majority female faculty and over 600 students. Shougat won the Green Talent award in 2015 for her low-cost solar PV irrigation system and she is one of the United Nation\'s Sustainable Development Gloals Young Leaders.',
   'Samar Mezghanni is a Tunisian writer who capitivates audiences with her storytelling. She is in the Guiness Book of world records for being the youngest and most prolific writer in the world, and she has been named one of the most powerful Arab women. Encouraging young people to write about the world that they want to see, Samir is one of United Nation\'s Sustainable Development Gloals Young Leaders.',
   'Nikki Fraser stands up for the rights of indigenous women in Canada, and worldwide, bringing to light the numerous lost women who are missing with unexplained circumstances. A mother of two, she is the Youth Representative from British Columbia Native Women\'s Association and National Youth Representative for the Native Women\’s Association of Canada. She was a young leader selected to interview Prime Minister Justin Trudeau and she is one of United Nation\'s Sustainable Development Gloals Young Leaders.',
   'Tere Garcia is the president of Liter of Light in Mexico, an organization that repurposes plastic soda bottles to create sustainable light sources. Working with organizations like the World Bank and MTV Agents of Change, she encourages young people to enact positive change in society. She is one of United Nation\'s Sustainable Development Gloals Young Leaders.',
   'Sheryl Sandberg is a technology executive, author, and philanthropist. Currently the chief operating officer of Facebook, she is the founder of the organization Lean In. She has authored three books aimed at helping women advance in the workforce, she frequently appears in listings of most influential people, and she contributed more than a hundred million dollars in Facebook stock to fund charitable efforts through the Sheryl Sandberg and Dave Goldberg Family Foundation.',
   'Kimberly Bryant is a technologist, engineer, and the founder of Black Girls Code. Knowing the isolation that women face in science and tech, especially minority women, Kimberly wanted a better environment for her daughter and others to learn in, so she made one. Kimberly has been recognized as a White House champion of Change for Tech inclusion and voted one of the 25 most influential African Americans in Technolgy by Business Insider.',
   'Erica Baker is an engineer and technology executive, renowned for her support for diversity and inclusion in tech. Erica has worked for tech companies such as Google, Slack, Kickstarter and Patreon. At Google, she created an internal spreadsheet where employees could willingly disclose their salaries, sparking discussion on disparities in pay based on gender and ethnicity. She carries this passion for equitable pay forward through initiatives such as the hastag Real Diversity Numbers, a Twitter movement to encourage companies to report about diversity.',
   'Tracy Chou is a software engineer with experience at companies such as Google, Facebook, Quora, and RocketFuel. She is recognized as an advocate for diversity in tech and she co-founded Project Include with 7 other women. She created a public Github repository where companies can report their diversity numbers and is credited as being influential in getting high profile tech companies like Microsoft to start reporting their diversity numbers.',
   'Gwynne Shotwell is an engineer and excutive, currently the President and Chief Operating Officer at SpaceX, a space exploration company. When she\'s not helping deliver astronauts to the International Space Station, she participates in a variety of science, technology, math and engineering initiatives. In 2012, she was added to the Women in Technology Hall of Fame.',
   'Jane Goodall is a British primatologist and anthropologist best known for her study of chimpanzees and advocacy on animal welfare issues. She was made a Dame, she\'s a United Nation\'s Messenger for Peace, and she has received dozens of awards for her research and advocacy. She even has a plaque on the Tree of Life at Walt Disney World\'s Animal Kingdom theme park.',
   'Ann Dunwoody achieved a lot of firsts for women in the United States military. She was the first woman to command a battalion in the 82nd Airborne Division, the first female General officer at Fort Bragg, the first woman to command the Combined Arms Support Command at Fort Lee, and the first woman in the United States military to achieve the rank of 4 star General. On top of many military honors, she fought for sexual assault prevention in the United States Army.',
   'Harriet Tubman was an abolisionist, humanitarian, and a spy during the American Civil War. Born a slave, she escaped and helped others to escape through her involvement with the Undeground Railroad. After the war, she advocated for women\'s right to vote. In 2016, the former U.S. Secretary of the Treasury proposed to put Harriet on the front of the 20 dollar bill, however, this was blocked by politician Steve Mnuchin.',
   'Dorothy Hodgkin was British chemist who was awarded the Nobel Prize for her work in understanding the structure of penicillin. She advanced the technique of X-ray crystallography, a method that scientists use to study the structure of crystals.',
   'Rosa Parks was a pivotal figure in the Civil Rights Movement. Famous for her refusal to give up her seat to a white passenger when the U.S. was still practicing racial segregation in 1955, she became an international symbol. Her arrest sparked a bus boycott that lasted over a year until the city of Montgomery finally repealed its law requiring segregation on public buses. Rosa was recognized by the U.S. Congress as the first lady of civil rights, she was awarded the Presidental Medal of Freedom, the Congressional Gold Medal, the Spingarn Medal, among others, and she is commenorated a statue in the National Statuary Hall.',
   'Eva Peron, or Evita, as she was known, was a former First Lady of Argentina, known for her fight to end poverty and empower women. When she was turned away from the charity group traditionally led by the First Lady due to her impoverished upbringing and career as an actress, she started her own foundation, seeding it with her own money. Her foundation went on to employ thousands of workers, and built entire communities that still exist today.',
   'Samantha Bee is a Canadian-American comedian, feminist, writer and political commentator. She is best known for making our sides ache with laughter from her performances on The Daily Show and, since 2015, her show titled Full Frontal with Samantha Bee. She has won numerous awards in television and media, she raised over a million dollars with her natsy woman tee shirts for planned parenthood, and she even authored a vegan cookbook.',
   'Rachel Atherton is a British professional racing cyclist. She specializes in downhill mountain biking. Being hit head on by a truck in 2009 didn\'t stop her from returning to the sport. Rachel holds the world record for being the first woman to consecutively win 10 rounds of the World Cup, and for winning every round of a World Cup in the 2016 season.',
   'Emma Watson is an award winning British actress, feminist and model. She is best known for her breakout role as Hermione Granger in the Harry Potter film series. She speaks two languages, went to the Dragon School and later Brown University, she was the youngest person to appear on the cover of Teen Vogue, she is a UN Women Goodwill Ambassador, and she has a feminist book club called Goodreads.',
   'Rachael Carson was a writer and marine biologist whose book titled Silent Spring is credited with starting the global environmental movement. Her skill in explaining scientific concepts in poetic, tangible ways, helped to warn a generation of the dangers of a pesticide called DDT. In Silent Spring, she exaplains how DDT accumulates in the fatty tissue of animals, which later goes up the food chain and ends up accumulating in human\'s fatty tissues, ultimately leading to genetic mutations and cancer. She was awarded the Presidential Medal of Freedom, included in a series of Great American postage stamps, she has research institutes, research vessels, parks, prizes and scholarships named after her, and even a Google Doodle.',
   'Juliette Low founded the Girl Scouts in 1913. The Girl Scouts played a role in recovery following World War 1, assisting the Red Cross in making surgical dressings, knitting clothes for soliders, and growing and canning food. Today the World Assocation of Girl Guides and Girl Scouts has 146-member organizations and continues to work ot inspire girls and young women to reach their full potential as responsible citizens of the world.',
   'Oprah Winfrey is a media icon, philantrhopist, actress and producer. Overcoming the disadvantages of poverty and childhood abuse, Time magazine and CNN have hailed her as the world\'s most powerful women. Above and beyond inventing her own style of talk show centered on self-improvement and spirituality, for 6 years she ranked among the 50 most generous Americans, she has donated hundreds of millions of dollars to educational causes and to non-profit organizations through her charity Oprah\'s Angel Network. She has won numerous awards and honors, including the Presidental Medal of Freedom.',
   'Ellen Degeneres is a comedian, actress, writer, producer, TV host and LGBT activist. Best known for her role in the show Ellen, she was the first openly lesbian actress to play a lesbian character on TV. She later started her own talk show called The Ellen Degeneres show, where she is known for dancing and singing with her audience, and her generosity. She is a Special envoy for Global AIDS awareness, a vegan and animal rights activist, and she has won numerous awards and honors, including the Presidental Medal of Freedom. ',
   'Eva Longoria is an award winning actress, producer, director, activist and philanthropist. She became popular in TV roles for the Young and The Restless and Desparate Housewives, among others. Eva has started two charitable organizations. Eva\'s Heroes helps developmentally disabled children and the Eva Longoria Foundation aims to close the education gap in the Latina community.',
   'Sally Ride was a physicist and astronaut. She was the first American woman to travel to space, and the youngest astronaut to do so. She received numerous awards for her work, such as the NASA space flight medal, the von Braun Award, the Lindbergh Eagle, and she\'s a member of the Women\'s Hall of Fame and the Astronaut Hall of Fame.',
   'Lise Meitner as an Austrian-Swedish physicist. She was the first woman to become a full professor of Physics in Germany, a position she lost during the Nazi rule because of her Jewish background. She worked closely with colleague Otto Hahn and together they discovered new isotopes, including the first long-lived isotope discovered, protactinium. Han was  later awarded the Nobel Prize for the discovery of nuclear fission, but Lise was excluded. She has received numerous awards and honors for her work, and the element meitnerium is named in her honor.',
   'Emmy Noether was a German mathematician best known for her contributions in abstract algebra and theoretical physics. She spoke 2 langagues, was one of two female students at the university she attended, worked as a university lecturer without pay for nearly a decade because of her gender, and went on to make major contributions to the scientific community, such as developing the theories of rings, fields, and aglebras in mathematics, and Noether\'s theorem in physics, which discusses the connection between symmetry and conservation laws.',
   'Rosalyn Yalow was a medical physist. She is best known for her work in developing the radioimmunoassay technique, or RIA, for which she and her collaborators received a Nobel Prize. The RIA technique allows for the detection of minute quantities of biological substances in the blood, and it has many applications, such as blood-screening or identifying specific health problems. She recevied numerous awards for her work, such as a Fulbright fellowship, AMA Scientific Achievement Award, and the National Medal of Science.',
   'Gertrude Elion was a biochemist and pharmacologist best known for her work developing drugs called purines. She invented drugs utilized for the treatment of lukemia, bacterial infections, malaria, and as immunosuppressents, among others. She received many awards and honors for her work, including a Nobel Prize in Physiology or Medicine, she was a fellow of numerous scientific institutions, and she was the first woman to be inducted into the National Inventors Hall of Fame.',
   'Shirin Ebadi is an Iranian human rights lawyer, former judge, and a human rights activist. She founded of the Defenders of Human Rights Center in Iran and best known for work promoting democracy, and defending women and children. She was the Iranian and the first Muslim woman to receive the Nobel Peace Prize.',
   'Joanne Rowling, or as she is better known by her pen name J.K. Rowling, is best known as the author of the Harry Potter book and film series. A feminist and social activist, she established the Volant Charitable Trust to address poverty and social injustice, and she lost her billionare status by donating funds to combat multiple sclerosis, to support child welfare and other educational initiatives. She has received numerous literary awards and film awards for her work.',
   'Sandra Day O\'Connor is a retired Supreme Court justice. She was the first woman to sever as the female majority leader of a state senate, and she was the first woman to serve on the Supreme Court. She received numerous awards for leadership and service, such as the Elizabeth Blackwell Award, the Liberty Medal, the Presidential Medal of Freedom, and she\'s even been inducted into the Cowgirl Hal of Fame.',
   'Jennifer Doudna is a biochemist and professor of chemisty best known for her contributions to genetic engineering, especially CRISPR genome editing. She and colleagues discovered that CRISPR, a family of DNA sequences found in bacteria, has a protein called Cas9 that acts like a pair of scissors to slice the DNA of viruses. They utilized this discovery to make a more efficient way for scientists to edit genomic DNA. Jennifer is the recipient of numerous scientific awards, such as the Alan T. Waterman Award, the Beckman Young Investigator\'s Award, and together with Emmanuelle Charpentier, she received the Breakthrough Prize in Life Sciences and the Japan Prize for her work on CRISPR/Cas9 genome editing technology.',
   'Emmanuelle Charpentier is a French researcher and professor best known for her work in developing CRISPR/Cas9 genome editing technology. Her work undercovered the molecular mechanisms in the CRISPR/Cas9 bacteria immune system, and together with Jennifer Doudna, she received the Breakthrough Prize in Life Sciences for this work. This method for genomic editing is being used by scientists around the world to edit DNA sequences. She has received numerous scientific awards for her work, such as the Gruber Foundation International Prize in Genetics, the Leibniz Prize, and the Japan Prize, among others.',
   'Misty Copeland is a principal dancer with the American Ballet Theater, and she was the first African American woman to hold this role at this company, and the first black female dancer at a major international ballet company. She has won numerous awards, such as the Leonore Annenberg Fellowship in the Arts, the National Youth of the Year Ambassador by the Boys and Girls Club, one of ESPN\'s impact 25 athletes and influencers, and one of Barabar Walter\'s top 10 most fascinating people, among others. Misty also has a barbie made in her likeness.',
   'Annelies or Ann Frank was a Jewish German citizen best known for her diary, which is one of the most widely read books in the world. Published after her death, The Diary of a Young Girl, candidly recounts her life during the German occupation of the Netherlands during World War 2. Her diary has inspired many books and films, and she was named one of the most important people of the century by Time magazine, as her words vividly paint a picture of the costs of war. ',
   'Angela Merkel is a German politician and the first female Chancellor of Germany. After receiving her Ph.D. in quantum chemistry, she was a researcher in her early career. She was elected to the German parliament in 1990 and has continuously been re-elected since then. She is best known for her efforts to stengthen European cooperation and trade agreements. She is often referred to as the de facto leader of the European Union. ',
   'Wangari Maathai was a Kenyan environmental activist, professor and stateswoman. She is best known for founding the Green Belt Movement. She was the first woman in Nairobi to be appointed as Senior Lecturer, department chair, and then Associate Professor, and the first African woman, and the first environmentalist, to receive the Nobel Peace Prize. She was an elected member of the Parliament, an assistant minister for environment and natural resources, and an honorary councillor of the World Future Council.',
   'Elizabeth Blackwell was a Bristish physician who made many firsts for women in the medical profession. She was the first woman to recieve a medical degree in the United States, and the first to be on the medical register in the United Kingdom. She worked to disrupt the social barriers keeping women out of medical school, helping to start a medical college for women before retiring.',
   'Marie Curie was a Polish-French scientist who accomplished many firsts for women. She was the first woman to win a Nobel Prize, the first person to win the Nobel Prize twice, and in two different categories, and the first woman to reach the rank of Professor at the University of Paris. She developed the theory of radioactivity, discovered 2 isotopes, started the Curie Research Insitutes in Paris, and developed mobile X-ray units.',
   'Barbara McClintock',
   'Maria Goeppart Mayer',
   'Rita Levi-Montalchini',
   'Cie-Shiun Wu',
   'Rosalind Franklin',
   'Joan Didion',
   'Margaret Bourke-White',
   'Katharine Graham',
   'Dorothy Crowfoot Hodgkin',
   'Margaret Bourke-White',
   'Katharine Graham',
   'Nora Ephron',
   'Barbara Walters',
   'Molly Irvins',
   'Dolores Huerta',
   'Ella Baker',
   'Florence Griffith Joyner',
   'Hazel Scott',
   'Isadora Duncan',
   'Jovita Idar',
   'Maya Lin',
   'Patti Smith',
   'Yuri Kochiyama',
   'Zora Neale Hurston',
   'Virginia Apgar',
   'Ursula LeGuin',
   'Temple Gradin',
   'Sonoia Sotomayor',
   'Nellie Bly',
   'Amy Sherald',
   'We Zetian',
   'Vera Atkins',
   'Melinda Gates',
   'Gisèle Ben-Dor',
   'Estée Lauder',
   'Margaret Meade',
   'Stephanie Kwolek',
   'Heddy Lamar',
   'Eleanor Roosevelt'
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
