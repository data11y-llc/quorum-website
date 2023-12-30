export type AssetInfo = {
  name: string;
  description: string;
  category: string;
  url: string;
  //allow me to add extra fields that can be different for each asset
  imageOptions?: {};
  soundOptions?: {};
  csvOptions?: {};
};

export type AssetCategory = {
  [categoryName: string]: AssetInfo[];
};

export type AssetJson = {
  Images: AssetCategory;
  Sounds: AssetCategory;
  CSVs: AssetCategory;
};

export const assetJson: AssetJson = {
  Images: {
    Timers: [
      {
        name: 'hourglass',
        description:
          'An illustration of an hourglass, with yellow sand and a copper base',
        category: 'Timers',
        url: 'hourglass.png',
      },
      {
        name: '5 Minute Timer',
        description:
          'A digital clock with a grey rectangular face and rounded corners. The time displayed is 5:00 in red digital numbers.',
        category: 'Timers',
        url: '5 Minute Timer.png',
      },
    ],
    Animals: [
      {
        name: 'Blue Jay',
        description:
          'A blue jay bird in profile, with blue body, black and white markings on its wings and tail, white head with black stripe, black pointed beak, and black feet. The background is transparent.',
        category: 'Animals',
        url: 'Blue Jay.png',
      },
      {
        name: 'Eagle',
        description:
          'A bald eagle in flight, with white head, brown body, yellow beak, and orange feet. The background is white.',
        category: 'Animals',
        url: 'Eagle.png',
      },
      {
        name: 'Hawk',
        description:
          'A Hawk bird in flight, with brown body, white and black markings on its wings and tail, and yellow head and beak. The background is transparent.',
        category: 'Animals',
        url: 'Hawk.png',
      },
      {
        name: 'Budgie',
        description:
          'A yellow and green Budgie with yellow head, green body with black stripes, small beak, and pink feet. The background is white.',
        category: 'Animals',
        url: 'Budgie.png',
      },
      {
        name: 'Emu',
        description:
          'An emu, a large flightless bird with blue neck and head, black beak, white stripe on its neck, brown feathers on its body, and grey scaly legs. The background is transparent.',
        category: 'Animals',
        url: 'Emu.png',
      },
      {
        name: 'Hummingbird',
        description:
          'A photo realistic image of a hummingbird in flight with a red beak and a green and blue iridescent body. The wings are spread out and the tail feathers are fanned out. The background is transparent.',
        category: 'Animals',
        url: 'Hummingbird.png',
      },
      {
        name: 'Ostrich',
        description:
          'A photo realistic image of an ostrich with black and white feathers on the wings and tail. The legs and neck of the ostrich are light pink. The background is white',
        category: 'Animals',
        url: 'Ostrich.png',
      },
      {
        name: 'Penguin',
        description:
          'A penguin with black head, back, and wings, white belly and orange neck, beak, and feet. The background is transparent.',
        category: 'Animals',
        url: 'Penguin.png',
      },
      {
        name: 'Peregrine Falcon',
        description:
          'A Falcon in flight with brown body, white and black markings on wings and tail, yellow beak, and piercing eyes. The background is white.',
        category: 'Animals',
        url: 'Peregrine Falcon.png',
      },
      {
        name: 'Parrot',
        description:
          'A colorful parrot with blue head, orange chest, green wings and tail, and yellow belly standing on white background facing towards the left side of the image. The background is transparent.',
        category: 'Animals',
        url: 'Parrot.png',
      },
      {
        name: 'Robin',
        description:
          'An American Robin with black head and wings, and red breast perched on a brown branch facing towards the left side of the image. The background is white.',
        category: 'Animals',
        url: 'Robin.png',
      },
      {
        name: 'Sparrow',
        description:
          'A Sparrow, a bird with a black head, white cheeks, on a branch with its wings spread wide.”',
        category: 'Animals',
        url: 'Sparrow.png',
      },
      {
        name: 'Swan',
        description:
          'A Swan, a white bird with a long neck looking towards the right side of the image. The background is white.',
        category: 'Animals',
        url: 'Swan.png',
      },
      {
        name: 'Woodpecker',
        description:
          'A woodpecker with black and white feathers, red head, and black beak perched on a brown branch facing towards the right side of the image. The background is transparent.',
        category: 'Animals',
        url: 'Woodpecker.png',
      },
      {
        name: 'pig',
        description:
          'A pig illustration, with pink body, looking towards the center of the image. The background is transparent.',
        category: 'Animals',
        url: 'pig.png',
      },
      {
        name: 'piggy',
        description:
          'A piggy illustration, with pink body, looking towards the center of the image, with the letters "OINK". The background is transparent.',
        category: 'Animals',
        url: 'piggy.png',
      },
      {
        name: 'Paw Icon',
        description: 'A green paw icon',
        category: 'Animals',
        url: 'Paw Icon.png',
      },
      {
        name: 'Cats In Money',
        description: 'two cartoon cats around 3 big coins',
        category: 'Animals',
        url: 'catsInMoney.png',
      },
      {
        name: 'Adopt Us',
        description:
          'two cartoon animals, a cat and a dog, with the text "Adopt Us!"',
        category: 'Animals',
        url: 'adoptUs.png',
      },
    ],
    Weather: [
      {
        name: 'Cloudy',
        description: 'A grey cloudy weather',
        category: 'Weather',
        url: 'Cloudy.png',
      },
      {
        name: 'Rain',
        description: 'A cloud with raindrops and a sun peeking out',
        category: 'Weather',
        url: 'Rain.png',
      },
      {
        name: 'Dark Clouds',
        description: 'a grey cloud in front of a dark grey cloud',
        category: 'Weather',
        url: 'Dark Clouds.png',
      },
      {
        name: 'Snow',
        description: 'A snowflake icon',
        category: 'Weather',
        url: 'Snow.png',
      },
      {
        name: 'Sunny',
        description: 'A sun icon',
        category: 'Weather',
        url: 'Sunny.png',
      },
      {
        name: 'Overcast',
        description: 'An cloud in front of a sun icon',
        category: 'Weather',
        url: 'Overcast.png',
      },
      {
        name: 'Sun',
        description: 'A sun with a face icon',
        category: 'Weather',
        url: 'sun.png',
      },
      {
        name: 'Moon',
        description: 'A white crescent moon icon',
        category: 'Weather',
        url: 'Moon.png',
      },
      {
        name: 'Thermometer',
        description: 'A thermometer icon for temperature',
        category: 'Weather',
        url: 'thermometer.png',
      },
      {
        name: 'Bolt',
        description: 'A white lightning bolt icon',
        category: 'Weather',
        url: 'Bolt.png',
      },
      {
        name: 'Angry Cloud',
        description: 'A grey cloud icon with an angry face',
        category: 'Weather',
        url: 'angyCloud.png',
      },
    ],
    Clothes: [
      {
        name: 'Top 1',
        description: 'a yellow hoodie',
        category: 'Clothes',
        url: 'Top1.png',
      },
      {
        name: 'Top 2',
        description: 'A blue jacket with a purple shirt',
        category: 'Clothes',
        url: 'Top2.png',
      },
      {
        name: 'Top 3',
        description:
          'a red shirt with horizontal white stripes and a white collar',
        category: 'Clothes',
        url: 'Top3.png',
      },
      {
        name: 'Top 4',
        description: 'a rainbow tank top',
        category: 'Clothes',
        url: 'Top4.png',
      },
      {
        name: 'Top 5',
        description: 'a green shirt with lighter green circles',
        category: 'Clothes',
        url: 'Top5.png',
      },
      {
        name: 'Top 6',
        description: 'An orange button up shirt with checkered pattern',
        category: 'Clothes',
        url: 'Top6.png',
      },
      {
        name: 'Bottom 1',
        description: 'blue jean shorts, with brown belt',
        category: 'Clothes',
        url: 'Bottom1.png',
      },
      {
        name: 'Bottom 2',
        description: 'long black pants',
        category: 'Clothes',
        url: 'Bottom2.png',
      },
      {
        name: 'Bottom 3',
        description: 'a green plaid skirt',
        category: 'Clothes',
        url: 'Bottom3.png',
      },
      {
        name: 'Bottom 4',
        description: 'a purple blouse, with dark purple stripes',
        category: 'Clothes',
        url: 'Bottom4.png',
      },
      {
        name: 'Bottom 5',
        description: 'cuffed black jeans',
        category: 'Clothes',
        url: 'Bottom5.png',
      },
      {
        name: 'Bottom 6',
        description: 'A pink skirt',
        category: 'Clothes',
        url: 'Bottom6.png',
      },
    ],
    Games: [
      {
        name: '8 Ball',
        description: 'An 8 ball for gaming, has the center cut out',
        category: 'Games',
        url: '8 Ball.png',
      },
      {
        name: 'Pair of Dice',
        description: 'A pair of dice, one red and one purple',
        category: 'Games',
        url: 'pairDice.png',
      },
      {
        name: 'Raffle',
        description: 'A hand holding a ticket with the word "Raffle" on it',
        category: 'Games',
        url: 'raffle.png',
      },
      {
        name: 'Rock',
        description: 'A rock icon for rock-paper-scissors',
        category: 'Games',
        url: 'rock.png',
      },
      {
        name: 'Paper',
        description: 'A paper icon for rock-paper-scissors',
        category: 'Games',
        url: 'paper.png',
      },
      {
        name: 'Scissors',
        description: 'A scissors icon for rock-paper-scissors',
        category: 'Games',
        url: 'scissors.png',
      },
      {
        name: 'Paper Button',
        description:
          'A paper icon from rock-paper-scissors, in an orange background with green borders',
        category: 'Games',
        url: 'paperButton.png',
      },
      {
        name: 'Scissors Button',
        description:
          'A scissors icon from rock-paper-scissors, in an orange background with green borders',
        category: 'Games',
        url: 'scissorsButton.png',
      },
      {
        name: 'Rock Button',
        description:
          'A rock icon from rock-paper-scissors, in an orange background with green borders',
        category: 'Games',
        url: 'rockButton.png',
      },
    ],
    Icons: [
      {
        name: 'Tree',
        description: 'A white tree icon',
        category: 'Icons',
        url: 'Tree.png',
      },
      {
        name: 'Bell Icon',
        description: 'A white bell icon',
        category: 'Icons',
        url: 'Bell Icon.png',
      },
      {
        name: 'Camera Icon',
        description: 'A camera icon',
        category: 'Icons',
        url: 'Camera Icon.png',
      },
      {
        name: 'Comment Icon',
        description: 'A white comment icon, with transparent background',
        category: 'Icons',
        url: 'Comment Icon.png',
      },
      {
        name: 'Thumb Down Icon',
        description: 'A thumbs-down icon',
        category: 'Icons',
        url: 'Thumb Down Icon.png',
      },
      {
        name: 'Thumb Up Icon',
        description: 'A thumbs-up icon',
        category: 'Icons',
        url: 'Thumb Up Icon.png',
      },
      {
        name: 'Dollar Icon',
        description: 'A dollar icon, with a 1 in the center',
        category: 'Icons',
        url: 'Dollar Icon.png',
      },
      {
        name: 'Film Icon',
        description: 'A white film reel icon',
        category: 'Icons',
        url: 'Film Icon.png',
      },
      {
        name: 'Globe',
        description: 'A white globe icon',
        category: 'Icons',
        url: 'Globe.png',
      },
      {
        name: 'Headphones Icon',
        description: 'A headphones icon',
        category: 'Icons',
        url: 'Headphones Icon.png',
      },
      {
        name: 'Music Note Icon',
        description: 'A music note icon',
        category: 'Icons',
        url: 'Music Note Icon.png',
      },
      {
        name: 'People Icon',
        description: 'An icon with 3 users',
        category: 'Icons',
        url: 'People Icon.png',
      },
      {
        name: 'Down Arrow',
        description: 'A blue downward pointing arrow',
        category: 'Icons',
        url: 'Down Arrow.png',
      },
      {
        name: 'Up Arrow',
        description: 'A red upward pointing arrow',
        category: 'Icons',
        url: 'Up Arrow.png',
      },
      {
        name: 'placeholder',
        description: 'A placeholder with a mountain and a sun',
        category: 'Icons',
        url: 'placeholder.png',
      },
      {
        name: 'Player Icon',
        description: 'A player icon',
        category: 'Icons',
        url: 'playerIcon.png',
      },
      {
        name: 'QR Code',
        description: 'A QR code icon',
        category: 'Icons',
        url: 'QR Code.png',
      },
      {
        name: 'Question Mark',
        description: 'A question mark icon',
        category: 'Icons',
        url: 'questionMark.png',
      },
      {
        name: 'Red List Icon',
        description: 'A red list icon, with numbers 1, 2 and 3',
        category: 'Icons',
        url: 'Red List Icon.png',
      },
      {
        name: 'School Supplies',
        description:
          'a picture with many school supplies, the illustractions are in blue',
        category: 'Icons',
        url: 'School Supplies.png',
      },
      {
        name: 'Shopping Cart Icon',
        description: 'A shopping cart icon',
        category: 'Icons',
        url: 'Shopping Cart Icon.png',
      },
      {
        name: 'Speaker Icon',
        description: 'A white speaker icon',
        category: 'Icons',
        url: 'Speaker Icon.png',
      },
      {
        name: 'Star Icon',
        description: 'A star icon',
        category: 'Icons',
        url: 'Star Icon.png',
      },
      {
        name: 'Thumb Down Icon',
        description: 'A white thumbs-down icon',
        category: 'Icons',
        url: 'Thumb Down Icon.png',
      },
      {
        name: 'Thumb Up Icon',
        description: 'A white thumbs-up icon',
        category: 'Icons',
        url: 'Thumb Up Icon.png',
      },
      {
        name: 'User Icon',
        description: 'A user icon',
        category: 'Icons',
        url: 'User Icon.png',
      },
      {
        name: 'Video Camera Icon',
        description: 'A video camera icon',
        category: 'Icons',
        url: 'Video Camera Icon.png',
      },
      {
        name: 'Right Arrow',
        description: 'A red right arrow icon',
        category: 'Icons',
        url: 'Right Arrow.png',
      },
      {
        name: 'Speaker',
        description: 'A speaker icon',
        category: 'Icons',
        url: 'speaker.png',
      },
      {
        name: 'CSV Icon',
        description: 'An icon with the letters CSV',
        category: 'Icons',
        url: 'csvIcon.png',
      },
      {
        name: 'Heart',
        description: 'A heart emoji',
        category: 'Icons',
        url: 'Heart.png',
      },
      {
        name: 'Star',
        description: 'A star emoji',
        category: 'Icons',
        url: 'Star.png',
      },
      {
        name: 'No Sign',
        description: 'A red circle with a diagonal line',
        category: 'Icons',
        url: 'No Sign.png',
      },
      {
        name: 'Phone Icon',
        description: 'A phone icon',
        category: 'Miscellaneous',
        url: 'computerIcon.png',
      },
      {
        name: 'Music',
        description: 'A music note',
        category: 'Miscellaneous',
        url: 'Music.png',
      },
      {
        name: 'Quarter',
        description: 'A quarter coin',
        category: 'Miscellaneous',
        url: 'Quarter.png',
      },
    ],
    'UI Elements': [
      {
        name: 'Comment Button',
        description: 'A speech bubble',
        category: 'UI Elements',
        url: 'Comment Button.png',
      },
      {
        name: 'Down Button',
        description: 'Black Downward Arrow Icon',
        category: 'UI Elements',
        url: 'Down Button.png',
      },
      {
        name: 'Up Button',
        description: 'Black Upward Arrow Icon',
        category: 'UI Elements',
        url: 'Up Button.png',
      },
      {
        name: 'Right Button',
        description: 'Black Rightward Arrow Icon',
        category: 'UI Elements',
        url: 'Right Button.png',
      },
      {
        name: 'Left Button',
        description: 'Black Leftward Arrow Icon',
        category: 'UI Elements',
        url: 'Left Button.png',
      },
      {
        name: 'Thumb Up Button',
        description: 'A thumbs-up icon in a white circle',
        category: 'UI Elements',
        url: 'Thumb Up Button.png',
      },
      {
        name: 'Thumb Down Button',
        description: 'A thumbs-down icon in a white circle',
        category: 'UI Elements',
        url: 'Thumb Down Button.png',
      },
      {
        name: 'Whiteboard',
        description: 'A whiteboard icon',
        category: 'UI Elements',
        url: 'Whiteboard.png',
      },
    ],
    Tickets: [
      {
        name: 'Adult Ticket',
        description: 'An adult ticket, says "Adult Admit One"',
        category: 'Tickets',
        url: 'adultTix.png',
      },
      {
        name: 'Child Ticket',
        description: 'A child ticket, says "Child Admit One"',
        category: 'Tickets',
        url: 'childTix.png',
      },
      {
        name: 'Senior Ticket',
        description: 'A senior ticket, says "Senior Admit One"',
        category: 'Tickets',
        url: 'seniorTix.png',
      },
      {
        name: 'Box Office',
        description: 'A ticket that says Box Office',
        category: 'Tickets',
        url: 'boxOffice.png',
      },
    ],
    Emotions: [
      {
        name: 'Happy Face',
        description: 'A happy face emoji',
        category: 'Emotions',
        url: 'Happy Face.png',
      },
      {
        name: 'Neutral Face',
        description: 'A neutral face emoji',
        category: 'Emotions',
        url: 'Neutral Face.png',
      },
      {
        name: 'Sad Face',
        description: 'A sad face emoji',
        category: 'Emotions',
        url: 'Sad Face.png',
      },
      {
        name: 'Smile',
        description: 'A smiling face emoji',
        category: 'Emotions',
        url: 'Smile.png',
      },
      {
        name: 'Smiley Face',
        description: 'A smiley face emoji',
        category: 'Emotions',
        url: 'Smiley Face.png',
      },
    ],
    Miscellaneous: [],
    Food: [
      {
        name: 'Apple',
        description: 'An apple',
        category: 'Food',
        url: 'Apple.png',
      },
      {
        name: 'Cookie',
        description: 'A cookie',
        category: 'Food',
        url: 'Cookie.png',
      },
      {
        name: 'Lemon Icon',
        description: 'A lemon icon',
        category: 'Food',
        url: 'Lemon Icon.png',
      },
      {
        name: 'Lemon',
        description: 'A lemon',
        category: 'Food',
        url: 'Lemon.png',
      },
      {
        name: 'Lime',
        description: 'A lime',
        category: 'Food',
        url: 'Lime.png',
      },
      {
        name: 'Disposable Water Bottle',
        description: 'A disposable water bottle',
        category: 'Food',
        url: 'Disposable Water Bottle.png',
      },
      {
        name: 'Glass Water Bottle',
        description: 'A glass water bottle',
        category: 'Food',
        url: 'Glass Water Bottle.png',
      },
      {
        name: 'Empty Bowl',
        description: 'An empty bowl',
        category: 'Food',
        url: 'emptyBowl.png',
      },
      {
        name: 'Eatery Icon',
        description: 'An eatery icon',
        category: 'Food',
        url: 'Eatery Icon.png',
      },
    ],
    'Colors and Shapes': [
      {
        name: 'blue',
        description: 'A blue square',
        category: 'Colors and Shapes',
        url: 'blue.png',
      },
      {
        name: 'purple',
        description: 'A purple square',
        category: 'Colors and Shapes',
        url: 'purple.png',
      },
      {
        name: 'red',
        description: 'A red square',
        category: 'Colors and Shapes',
        url: 'red.png',
      },
    ],
    Buildings: [
      {
        name: 'Building Icon',
        description: 'A building icon',
        category: 'Buildings',
        url: 'Building Icon.png',
      },
      {
        name: 'House White',
        description: 'A white house',
        category: 'Buildings',
        url: 'House White.png',
      },
      {
        name: 'House',
        description: 'A house',
        category: 'Buildings',
        url: 'House.png',
      },
    ],
    Cats: [
      {
        name: 'Dragon Li',
        description: 'Dragon Li',
        category: 'Cats',
        url: 'CatImages/Dragon Li.jpg',
      },
      {
        name: 'Sphynx',
        description: 'Sphynx',
        category: 'Cats',
        url: 'CatImages/Sphynx.jpg',
      },
      {
        name: 'Turkish Van',
        description: 'Turkish Van',
        category: 'Cats',
        url: 'CatImages/Turkish Van.jpg',
      },
      {
        name: 'Maine Coon',
        description: 'Maine Coon',
        category: 'Cats',
        url: 'CatImages/Maine Coon.jpg',
      },
      {
        name: 'Cymric',
        description: 'Cymric',
        category: 'Cats',
        url: 'CatImages/Cymric.jpg',
      },
      {
        name: 'Somali',
        description: 'Somali',
        category: 'Cats',
        url: 'CatImages/Somali.jpg',
      },
      {
        name: 'Korat',
        description: 'Korat',
        category: 'Cats',
        url: 'CatImages/Korat.jpg',
      },
      {
        name: 'Ragamuffin',
        description: 'Ragamuffin',
        category: 'Cats',
        url: 'CatImages/Ragamuffin.jpg',
      },
      {
        name: 'Toyger',
        description: 'Toyger',
        category: 'Cats',
        url: 'CatImages/Toyger.jpg',
      },
      {
        name: 'Tonkinese',
        description: 'Tonkinese',
        category: 'Cats',
        url: 'CatImages/Tonkinese.jpg',
      },
      {
        name: 'Turkish Angora',
        description: 'Turkish Angora',
        category: 'Cats',
        url: 'CatImages/Turkish Angora.jpg',
      },
      {
        name: 'American Bobtail',
        description: 'American Bobtail',
        category: 'Cats',
        url: 'CatImages/American Bobtail.jpg',
      },
      {
        name: 'LaPerm',
        description: 'LaPerm',
        category: 'Cats',
        url: 'CatImages/LaPerm.jpg',
      },
      {
        name: 'Abyssinian',
        description: 'Abyssinian',
        category: 'Cats',
        url: 'CatImages/Abyssinian.jpg',
      },
      {
        name: 'Norwegian Forest Cat',
        description: 'Norwegian Forest Cat',
        category: 'Cats',
        url: 'CatImages/Norwegian Forest Cat.jpg',
      },
      {
        name: 'Snowshoe',
        description: 'Snowshoe',
        category: 'Cats',
        url: 'CatImages/Snowshoe.jpg',
      },
      {
        name: 'British Longhair',
        description: 'British Longhair',
        category: 'Cats',
        url: 'CatImages/British Longhair.jpg',
      },
      {
        name: 'Bengal',
        description: 'Bengal',
        category: 'Cats',
        url: 'CatImages/Bengal.jpg',
      },
      {
        name: 'Javanese',
        description: 'Javanese',
        category: 'Cats',
        url: 'CatImages/Javanese.jpg',
      },
      {
        name: 'Scottish Fold',
        description: 'Scottish Fold',
        category: 'Cats',
        url: 'CatImages/Scottish Fold.jpg',
      },
      {
        name: 'British Shorthair',
        description: 'British Shorthair',
        category: 'Cats',
        url: 'CatImages/British Shorthair.jpg',
      },
      {
        name: 'Burmilla',
        description: 'Burmilla',
        category: 'Cats',
        url: 'CatImages/Burmilla.jpg',
      },
      {
        name: 'California Spangled',
        description: 'California Spangled',
        category: 'Cats',
        url: 'CatImages/California Spangled.jpg',
      },
      {
        name: 'Colorpoint Shorthair',
        description: 'Colorpoint Shorthair',
        category: 'Cats',
        url: 'CatImages/Colorpoint Shorthair.jpg',
      },
      {
        name: 'Kurilian',
        description: 'Kurilian',
        category: 'Cats',
        url: 'CatImages/Kurilian.jpg',
      },
      {
        name: 'Manx',
        description: 'Manx',
        category: 'Cats',
        url: 'CatImages/Manx.jpg',
      },
      {
        name: 'Savannah',
        description: 'Savannah',
        category: 'Cats',
        url: 'CatImages/Savannah.jpg',
      },
      {
        name: 'Cyprus',
        description: 'Cyprus',
        category: 'Cats',
        url: 'CatImages/Cyprus.jpg',
      },
      {
        name: 'American Wirehair',
        description: 'American Wirehair',
        category: 'Cats',
        url: 'CatImages/American Wirehair.jpg',
      },
      {
        name: 'Exotic Shorthair',
        description: 'Exotic Shorthair',
        category: 'Cats',
        url: 'CatImages/Exotic Shorthair.jpg',
      },
      {
        name: 'Australian Mist',
        description: 'Australian Mist',
        category: 'Cats',
        url: 'CatImages/Australian Mist.jpg',
      },
      {
        name: 'Siamese',
        description: 'Siamese',
        category: 'Cats',
        url: 'CatImages/Siamese.jpg',
      },
      {
        name: 'Persian',
        description: 'Persian',
        category: 'Cats',
        url: 'CatImages/Persian.jpg',
      },
      {
        name: 'American Shorthair',
        description: 'American Shorthair',
        category: 'Cats',
        url: 'CatImages/American Shorthair.jpg',
      },
      {
        name: 'Birman',
        description: 'Birman',
        category: 'Cats',
        url: 'CatImages/Birman.jpg',
      },
      {
        name: 'Khao Manee',
        description: 'Khao Manee',
        category: 'Cats',
        url: 'CatImages/Khao Manee.jpg',
      },
      {
        name: 'York Chocolate',
        description: 'York Chocolate',
        category: 'Cats',
        url: 'CatImages/York Chocolate.jpg',
      },
      {
        name: 'Siberian',
        description: 'Siberian',
        category: 'Cats',
        url: 'CatImages/Siberian.jpg',
      },
      {
        name: 'Aegean',
        description: 'Aegean',
        category: 'Cats',
        url: 'CatImages/Aegean.jpg',
      },
      {
        name: 'placeholder',
        description: 'placeholder',
        category: 'Cats',
        url: 'CatImages/placeholder.png',
      },
      {
        name: 'Ragdoll',
        description: 'Ragdoll',
        category: 'Cats',
        url: 'CatImages/Ragdoll.jpg',
      },
      {
        name: 'Bambino',
        description: 'Bambino',
        category: 'Cats',
        url: 'CatImages/Bambino.jpg',
      },
      {
        name: 'Bombay',
        description: 'Bombay',
        category: 'Cats',
        url: 'CatImages/Bombay.jpg',
      },
      {
        name: 'Arabian Mau',
        description: 'Arabian Mau',
        category: 'Cats',
        url: 'CatImages/Arabian Mau.jpg',
      },
      {
        name: 'Oriental',
        description: 'Oriental',
        category: 'Cats',
        url: 'CatImages/Oriental.jpg',
      },
      {
        name: 'Cornish Rex',
        description: 'Cornish Rex',
        category: 'Cats',
        url: 'CatImages/Cornish Rex.jpg',
      },
      {
        name: 'Havana Brown',
        description: 'Havana Brown',
        category: 'Cats',
        url: 'CatImages/Havana Brown.jpg',
      },
      {
        name: 'Singapura',
        description: 'Singapura',
        category: 'Cats',
        url: 'CatImages/Singapura.jpg',
      },
      {
        name: 'Cheetoh',
        description: 'Cheetoh',
        category: 'Cats',
        url: 'CatImages/Cheetoh.jpg',
      },
      {
        name: 'Munchkin',
        description: 'Munchkin',
        category: 'Cats',
        url: 'CatImages/Munchkin.jpg',
      },
      {
        name: 'Chartreux',
        description: 'Chartreux',
        category: 'Cats',
        url: 'CatImages/Chartreux.jpg',
      },
      {
        name: 'American Curl',
        description: 'American Curl',
        category: 'Cats',
        url: 'CatImages/American Curl.jpg',
      },
      {
        name: 'Nebelung',
        description: 'Nebelung',
        category: 'Cats',
        url: 'CatImages/Nebelung.jpg',
      },
      {
        name: 'Chausie',
        description: 'Chausie',
        category: 'Cats',
        url: 'CatImages/Chausie.jpg',
      },
      {
        name: 'European Burmese',
        description: 'European Burmese',
        category: 'Cats',
        url: 'CatImages/European Burmese.jpg',
      },
      {
        name: 'Pixie-bob',
        description: 'Pixie-bob',
        category: 'Cats',
        url: 'CatImages/Pixie-bob.jpg',
      },
      {
        name: 'Balinese',
        description: 'Balinese',
        category: 'Cats',
        url: 'CatImages/Balinese.jpg',
      },
      {
        name: 'Devon Rex',
        description: 'Devon Rex',
        category: 'Cats',
        url: 'CatImages/Devon Rex.jpg',
      },
      {
        name: 'Egyptian Mau',
        description: 'Egyptian Mau',
        category: 'Cats',
        url: 'CatImages/Egyptian Mau.jpg',
      },
      {
        name: 'Chantilly-Tiffany',
        description: 'Chantilly-Tiffany',
        category: 'Cats',
        url: 'CatImages/Chantilly-Tiffany.jpg',
      },
      {
        name: 'Russian Blue',
        description: 'Russian Blue',
        category: 'Cats',
        url: 'CatImages/Russian Blue.jpg',
      },
      {
        name: 'Japanese Bobtail',
        description: 'Japanese Bobtail',
        category: 'Cats',
        url: 'CatImages/Japanese Bobtail.jpg',
      },
      {
        name: 'Burmese',
        description: 'Burmese',
        category: 'Cats',
        url: 'CatImages/Burmese.jpg',
      },
      {
        name: 'Donskoy',
        description: 'Donskoy',
        category: 'Cats',
        url: 'CatImages/Donskoy.jpg',
      },
      {
        name: 'Malayan',
        description: 'Malayan',
        category: 'Cats',
        url: 'CatImages/Malayan.jpg',
      },
      {
        name: 'Himalayan',
        description: 'Himalayan',
        category: 'Cats',
        url: 'CatImages/Himalayan.jpg',
      },
      {
        name: 'Ocicat',
        description: 'Ocicat',
        category: 'Cats',
        url: 'CatImages/Ocicat.jpg',
      },
      {
        name: 'Selkirk Rex',
        description: 'Selkirk Rex',
        category: 'Cats',
        url: 'CatImages/Selkirk Rex.jpg',
      },
    ],
    'US State Seals': [
      {
        name: 'Alabama',
        description:
          'The Seal of the State of Alabama, showing a map of the state with the rivers labeled, surrounded by the words "Great Seal of Alabama".',
        category: 'US State Seals',
        url: 'Seals/Alabama.png',
      },
      {
        name: 'Arizona',
        description:
          "The seal of the state of Arizona, showing a mountain range with the sun rising behind the peaks, a storage reservoir and a dam, irrigated fields and orchards, a quartz mill with a miner with a pick and shovel, and grazing cattle. The state's motto, 'Ditat Deus,' meaning 'God Enriches,' is written above the quartz mill.",
        category: 'US State Seals',
        url: 'Seals/Arizona.png',
      },
      {
        name: 'California',
        description:
          "The Great Seal of the State of California, showing a grizzly bear and a miner with a pickaxe, surrounded by the words 'Eureka' and 'The Great Seal of the State of California'",
        category: 'US State Seals',
        url: 'Seals/California.png',
      },
      {
        name: 'Delaware',
        description:
          "The Great Seal of the State of Delaware, showing a shield with a farmer and a soldier on either side, surrounded by the words 'Great Seal of the State of Delaware' and 'Liberty and Independence 1704.1776.1787'",
        category: 'US State Seals',
        url: 'Seals/Delaware.png',
      },
      {
        name: 'New Mexico',
        description:
          "The Great Seal of the State of New Mexico, showing an eagle perched on a rock, surrounded by the words 'Great Seal of the State of New Mexico' and 'Crescit eundo' (meaning 'It grows as it goes')",
        category: 'US State Seals',
        url: 'Seals/New Mexico.png',
      },
      {
        name: 'Massachusetts',
        description:
          "The Great Seal of the Commonwealth of Massachusetts, showing a Native American with bow and arrow, surrounded by the words 'Sigillum Reipublicæ Massachusettensis' and 'Ense petit placidam sub libertate quietem'",
        category: 'US State Seals',
        url: 'Seals/Massachusetts.png',
      },
      {
        name: 'Kentucky',
        description:
          "The Great Seal of the State of Kentucky, showing two people shaking hands, surrounded by the words 'Of Kentucky on We Stand Divided We Fall' and 'Commonwealth'",
        category: 'US State Seals',
        url: 'Seals/Kentucky.png',
      },
      {
        name: 'Missouri',
        description:
          "The Great Seal of the State of Missouri, showing two bears, a shield, and a riverboat, surrounded by the words 'United We Stand, Divided We Fall' and 'Great Seal of the State of Missouri'",
        category: 'US State Seals',
        url: 'Seals/Missouri.png',
      },
      {
        name: 'Rhode Island',
        description:
          "The Great Seal of the State of Rhode Island and Providence Plantations, showing an anchor, surrounded by the words 'Sigillum Reipublicæ Insulæ Rhodiensis et Providentiarum Plantationum in Novâ Angliâ' and 'Hope'",
        category: 'US State Seals',
        url: 'Seals/Rhode Island.png',
      },
      {
        name: 'Oregon',
        description:
          "The Great Seal of the State of Oregon, showing a shield supported by 33 stars, with the words 'The Union' on a banner in the middle, and above the banner are mountains, an elk with branching antlers, a wagon, the Pacific Ocean on which a British man-of-war ship is departing, and an American steamer ship arriving.",
        category: 'US State Seals',
        url: 'Seals/Oregon.png',
      },
      {
        name: 'West Virginia',
        description:
          "The Great Seal of the State of West Virginia, showing a boulder inscribed with the date June 20, 1863, surrounded by two crossed rifles and a liberty cap, with a farmer on the left and a miner on the right. The words 'West Virginia' and 'Montani Semper Liberi' (meaning 'Mountaineers Are Always Free') are written above and below the seal.",
        category: 'US State Seals',
        url: 'Seals/West Virginia.png',
      },
      {
        name: 'Vermont',
        description:
          "The Great Seal of the State of Vermont, showing a pine tree, a cow, and a sheaf of wheat, surrounded by the words 'Freedom and Unity' and 'Vermont'",
        category: 'US State Seals',
        url: 'Seals/Vermont.png',
      },
      {
        name: 'Iowa',
        description:
          "The Great Seal of the State of Iowa, showing a citizen soldier holding an American flag in a wheat field, surrounded by farming and industrial tools, with the Mississippi River in the background. An eagle is overhead holding in its beak a scroll bearing the state motto: 'Our liberties we prize and our rights we will maintain.'",
        category: 'US State Seals',
        url: 'Seals/Iowa.png',
      },
      {
        name: 'New Jersey',
        description:
          "The Great Seal of the State of New Jersey, showing a shield with three plows and a horse on either side, supported by Liberty and Ceres, the goddesses of liberty and agriculture, with the words 'Great Seal of the State of New Jersey' and 'Liberty and Prosperity' above and below.",
        category: 'US State Seals',
        url: 'Seals/New Jersey.png',
      },
      {
        name: 'Kansas',
        description:
          "The Great Seal of the State of Kansas, showing a buffalo, a settler plowing a field, and a steamboat on the Missouri River, surrounded by the words 'Ad Astra per Aspera' (meaning 'To the Stars Through Difficulties').",
        category: 'US State Seals',
        url: 'Seals/Kansas.png',
      },
      {
        name: 'Washington',
        description:
          'The Great Seal of the State of Washington, showing George Washington, surrounded by the words "The Seal of the State of Washington" and "1889".',
        category: 'US State Seals',
        url: 'Seals/Washington.png',
      },
      {
        name: 'Illinois',
        description:
          'The Great Seal of the State of Illinois, showing an eagle, surrounded by the words "Seal of the State of Illinois" and "State Sovereignty, National Union".',
        category: 'US State Seals',
        url: 'Seals/Illinois.png',
      },
      {
        name: 'Idaho',
        description:
          'The Great Seal of the State of Idaho, showing a miner and a woman supporting a shield with symbols of Idaho\'s natural resources, surmounted by an elk\'s head and the state motto, "Esto Perpetua."',
        category: 'US State Seals',
        url: 'Seals/Idaho.png',
      },
      {
        name: 'Nevada',
        description:
          'The Great Seal of the State of Nevada, showing a silver miner and a woman representing equality, liberty, and justice supporting a shield with symbols of Nevada\'s natural resources, surmounted by a mountain range and the state motto, "All For Our Country."',
        category: 'US State Seals',
        url: 'Seals/Nevada.png',
      },
      {
        name: 'Alaska',
        description:
          'The Seal of the State of Alaska, showing a gold miner panning for gold in a river, surrounded by snow-capped mountains and the Northern Lights.',
        category: 'US State Seals',
        url: 'Seals/Alaska.png',
      },
      {
        name: 'South Carolina',
        description:
          'The Seal of the State of South Carolina, showing a palmetto tree and a woman holding a laurel wreath, surrounded by the words "Dum Spiro Spero" (Latin for "While I breathe I hope") and "Animis Opibusque Parati" (Latin for "Prepared in mind and resources").',
        category: 'US State Seals',
        url: 'Seals/South Carolina.png',
      },
      {
        name: 'North Dakota',
        description:
          'The Great Seal of the State of North Dakota, showing a tree with three bundles of wheat around the trunk, surrounded by symbols of North Dakota\'s natural resources, including a plow, an anvil, a sledgehammer, a bow with three arrows, and an American Indian on horseback pursuing a buffalo toward the setting sun. The seal also contains the state motto, "Liberty and Union, Now and Forever, One and Inseparable."',
        category: 'US State Seals',
        url: 'Seals/North Dakota.png',
      },
      {
        name: 'Colorado',
        description:
          'The Great Seal of the State of Colorado, showing a miner\'s pickaxe and shovel, surrounded by the words "Nil Sine Numine" (Latin for "Nothing Without Providence") and "Great Seal of the State of Colorado A.D. 1876."',
        category: 'US State Seals',
        url: 'Seals/Colorado.png',
      },
      {
        name: 'Maine',
        description:
          'The Great Seal of the State of Maine, showing a moose standing in front of a pine tree, surrounded by the words "Dirigo" (Latin for "I lead") and "District of Maine"',
        category: 'US State Seals',
        url: 'Seals/Maine.png',
      },
      {
        name: 'Oklahoma',
        description:
          'The Great Seal of the State of Oklahoma, showing a shield with symbols of Oklahoma\'s natural resources, surmounted by a five-pointed star and the state motto, "Labor Omnia Vincit" (Latin for "Labor Conquers All").',
        category: 'US State Seals',
        url: 'Seals/Oklahoma.png',
      },
      {
        name: 'Connecticut',
        description:
          'The Great Seal of the State of Connecticut, showing a shield with three grapevines surrounded by the words "Qui Transtulit Sustinet" (Latin for "He Who Transplanted Sustains") and "Sigillum Reipublicae Connecticutensis" (Latin for "Seal of the Republic of Connecticut").',
        category: 'US State Seals',
        url: 'Seals/Connecticut.png',
      },
      {
        name: 'New York',
        description:
          'The Great Seal of the State of New York, showing the figure of Liberty on the left and the figure of Justice on the right supporting a shield with symbols of New York\'s natural resources, surmounted by an American eagle and the state motto, "Excelsior" (Latin for "Ever Upward").',
        category: 'US State Seals',
        url: 'Seals/New York.png',
      },
      {
        name: 'Virginia',
        description:
          'The Great Seal of the Commonwealth of Virginia, showing the figure of Virtus, the Roman goddess of virtue, standing on the body of a fallen tyrant, surrounded by the words "Sic Semper Tyrannis" (Latin for "Thus Ever to Tyrants").',
        category: 'US State Seals',
        url: 'Seals/Virginia.png',
      },
      {
        name: 'Utah',
        description:
          'The Great Seal of the State of Utah, showing a beehive surrounded by a sego lily and a sunflower, surmounted by an American eagle and the state motto, "Industry."',
        category: 'US State Seals',
        url: 'Seals/Utah.png',
      },
      {
        name: 'Louisiana',
        description:
          'The Great Seal of the State of Louisiana, showing a pelican feeding its young in a nest, surrounded by the words "Union, Justice, Confidence."',
        category: 'US State Seals',
        url: 'Seals/Louisiana.png',
      },
      {
        name: 'South Dakota',
        description:
          'The Great Seal of the State of South Dakota, showing a miner panning for gold in a river, surrounded by a farmer plowing a field, a herd of cattle, and a riverboat.',
        category: 'US State Seals',
        url: 'Seals/South Dakota.png',
      },
      {
        name: 'Indiana',
        description:
          'The Great Seal of the State of Indiana, showing a woodsman standing in front of a tree, surrounded by the words "The Great Seal of the State of Indiana 1816" and the state motto, "The Crossroads of America." The seal also features a buffalo.',
        category: 'US State Seals',
        url: 'Seals/Indiana.png',
      },
      {
        name: 'Nebraska',
        description:
          'The Great Seal of the State of Nebraska, showing a steamboat ascending the Missouri River on the right, the Rocky Mountains on the left, a train of cars heading toward the Rocky Mountains in the background, a smith with hammer and anvil representing the mechanic arts, a settler\'s cabin and sheaves of wheat representing agriculture, and the state motto, "Equality Before the Law," at the top.',
        category: 'US State Seals',
        url: 'Seals/Nebraska.png',
      },
      {
        name: 'Montana',
        description:
          'The Great Seal of the State of Montana, showing a plow and a miner\'s pick and shovel in the foreground, the Great Falls of the Missouri River in the background, and the state motto, "Oro y Plata" (Spanish for "Gold and Silver"), at the bottom.',
        category: 'US State Seals',
        url: 'Seals/Montana.png',
      },
      {
        name: 'Arkansas',
        description:
          'The Great Seal of the State of Arkansas, showing a bald eagle with an olive branch in its right talon and three arrows in its left talon, standing on a shield with symbols of Arkansas\'s natural resources, including a steamboat, a beehive, and a plow, surmounted by a scroll with the state motto, "Regnat Populus" (Latin for "The People Rule").',
        category: 'US State Seals',
        url: 'Seals/Arkansas.png',
      },
      {
        name: 'Ohio',
        description:
          'The Great Seal of the State of Ohio, showing a rising sun above the Scioto River and Mount Logan, with a sheaf of wheat and a bundle of 17 arrows in the foreground. The seal is surrounded by the words "The Great Seal of the State of Ohio."',
        category: 'US State Seals',
        url: 'Seals/Ohio.png',
      },
      {
        name: 'Mississippi',
        description:
          'The Great Seal of the State of Mississippi, showing a bald eagle with an olive branch in its right talon and three arrows in its left talon, standing on a shield with stars and stripes.',
        category: 'US State Seals',
        url: 'Seals/Mississippi.png',
      },
      {
        name: 'Minnesota',
        description:
          'The Great Seal of the State of Minnesota, showing a farmer plowing a field in the foreground, a Native American on horseback in the background, and the Falls of Saint Anthony in the distance. The seal is surrounded by the words "The Great Seal of the State of Minnesota, 1858."',
        category: 'US State Seals',
        url: 'Seals/Minnesota.png',
      },
      {
        name: 'Maryland',
        description:
          'The Great Seal of the State of Maryland, showing a shield bearing the Calvert coat of arms in the middle, flanked by a farmer on the left and a fisherman on the right. The seal is surrounded by the words "Fatti maschii parole femine" (the Calvert motto, which translates to "strong deeds, gentle words") and "Scuto bonæ voluntatis tuæ coronasti nos" (Latin for "With favor wilt Thou compass us as with a shield").',
        category: 'US State Seals',
        url: 'Seals/Maryland.png',
      },
      {
        name: 'Pennsylvania',
        description:
          'The Great Seal of the State of Pennsylvania, showing a shield with a sailing ship, a clay-red plow, and three sheaves of wheat, flanked by a stalk of Indian corn on the left and an olive branch on the right. The shield is surmounted by an eagle, and the seal is surrounded by the inscription "Seal of the State of Pennsylvania."',
        category: 'US State Seals',
        url: 'Seals/Pennsylvania.png',
      },
      {
        name: 'Wisconsin',
        description:
          'The Great Seal of the State of Wisconsin, showing a shield with symbols of Wisconsin\'s main industries: agriculture (plow), mining (pick and shovel), manufacturing (arm and hammer), and navigation (anchor). The shield is supported by a sailor and a miner, representing labor on water and land. At the top of the seal is the state motto, "Forward."',
        category: 'US State Seals',
        url: 'Seals/Wisconsin.png',
      },
      {
        name: 'North Carolina',
        description:
          'The Great Seal of the State of North Carolina, showing the figures of Liberty and Plenty standing on either side of a shield with the state motto, "Esse Quam Videri" (Latin for "To be rather than to seem"). Liberty is holding a liberty cap and a scroll with the word "Constitution" inscribed on it, and Plenty is holding a cornucopia. The seal is surrounded by the dates "May 20, 1775" (the date of the Mecklenburg Declaration of Independence) and "April 12, 1776" (the date of the Halifax Resolves).',
        category: 'US State Seals',
        url: 'Seals/North Carolina.png',
      },
      {
        name: 'Georgia',
        description:
          'The Great Seal of the State of Georgia, showing a shield with three pillars representing the legislative, judicial, and executive branches of government, flanked by a man with a drawn sword representing the military defense of the Constitution and the state motto, "Wisdom, Justice, Moderation." The seal is surrounded by the inscription "Seal of the State of Georgia 1799."',
        category: 'US State Seals',
        url: 'Seals/Georgia.png',
      },
      {
        name: 'New Hampshire',
        description:
          'The Great Seal of the State of New Hampshire, showing the frigate Raleigh sailing on the Piscataqua River, flanked by a pine tree and a fish. The seal is surrounded by the inscription "Sigillum Reipublicae Neo Hantoniensis 1776" (Latin for "Seal of the Republic of New Hampshire 1776").',
        category: 'US State Seals',
        url: 'Seals/New Hampshire.png',
      },
      {
        name: 'Wyoming',
        description:
          'The Great Seal of the State of Wyoming, showing a draped figure of a woman representing equal rights standing on a pedestal, flanked by a cowboy and a miner representing the state\'s main industries. The seal is surmounted by a bison, and the inscription "The Great Seal of the State of Wyoming 1890" surrounds the seal.',
        category: 'US State Seals',
        url: 'Seals/Wyoming.png',
      },
      {
        name: 'Tennessee',
        description:
          'The Great Seal of the State of Tennessee, showing a plow, a sheaf of wheat, and a cotton plant in the center, flanked by the words "AGRICULTURE" and "COMMERCE." The seal is surrounded by the words "THE GREAT SEAL OF THE STATE OF TENNESSEE" at the top and "FEB. 6TH, 1796" at the bottom.',
        category: 'US State Seals',
        url: 'Seals/Tennessee.png',
      },
      {
        name: 'Hawaii',
        description:
          'The Great Seal of the State of Hawaii, showing King Kamehameha I standing to the right of a heraldic shield and the Goddess of Liberty holding the Hawaiian flag standing to the left. Below the shield is a phoenix rising from a wreath of eight taro leaves, banana foliage, and sprays of maidenhair fern.',
        category: 'US State Seals',
        url: 'Seals/Hawaii.png',
      },
      {
        name: 'Michigan',
        description:
          'The Great Seal of the State of Michigan, showing a shield with a rising sun over a lake and peninsula, a man holding a long gun with a raised hand, and the state motto, "Si Quaeris Peninsulam Amoenam Circumspice" (Latin for "If you seek a pleasant peninsula, look about you"). The seal is supported by two animals representing Michigan, the elk on the left and the moose on the right.',
        category: 'US State Seals',
        url: 'Seals/Michigan.png',
      },
      {
        name: 'Florida',
        description:
          'The Great Seal of the State of Florida, showing a woman scattering flowers on a Seminole Indian burial mound, flanked by a steamboat representing commerce and a coconut palm representing agriculture. The seal is surmounted by a sun with the words "In God We Trust" inscribed below, and the inscription "Great Seal of the State of Florida" surrounds the seal.',
        category: 'US State Seals',
        url: 'Seals/Florida.png',
      },
      {
        name: 'Texas',
        description:
          'The Great Seal of the State of Texas, showing a five-pointed star encircled by olive and live oak branches, and the words "THE STATE OF TEXAS."',
        category: 'US State Seals',
        url: 'Seals/Texas.png',
      },
    ],
    'US State Flags': [
      {
        name: 'Alabama',
        description:
          "The Alabama state flag, A crimson St. Andrew's Cross on a white field.",
        category: 'US State Flags',
        url: 'flags/Alabama.png',
      },
      {
        name: 'Arizona',
        description:
          'The Arizona state flag, blue with a red and yellow sunrise over an orange star.',
        category: 'US State Flags',
        url: 'flags/Arizona.png',
      },
      {
        name: 'California',
        description:
          'The California state flag, white with a red stripe along the bottom, a red star in the upper left, and a golden bear in the center.',
        category: 'US State Flags',
        url: 'flags/California.png',
      },
      {
        name: 'Delaware',
        description:
          'The Delaware state flag, buff with a diamond pattern of blue and gold, the state seal is in the center.',
        category: 'US State Flags',
        url: 'flags/Delaware.png',
      },
      {
        name: 'New Mexico',
        description:
          'The New Mexico state flag, red with a gold Zia sun symbol in the center.',
        category: 'US State Flags',
        url: 'flags/New Mexico.png',
      },
      {
        name: 'Massachusetts',
        description:
          'The Massachusetts state flag features a blue shield with a Native American holding a bow and arrow, on a white field with a blue seal above the shield.',
        category: 'US State Flags',
        url: 'flags/Massachusetts.png',
      },
      {
        name: 'Kentucky',
        description:
          'The Kentucky state flag, blue with the state seal in the center.',
        category: 'US State Flags',
        url: 'flags/Kentucky.png',
      },
      {
        name: 'Missouri',
        description: 'The Missouri state flag, red, white, and blue.',
        category: 'US State Flags',
        url: 'flags/Missouri.png',
      },
      {
        name: 'Rhode Island',
        description: 'The Rhode Island state flag, white with a gold anchor.',
        category: 'US State Flags',
        url: 'flags/Rhode Island.png',
      },
      {
        name: 'Oregon',
        description: 'The Oregon state flag, navy blue with a gold shield.',
        category: 'US State Flags',
        url: 'flags/Oregon.png',
      },
      {
        name: 'West Virginia',
        description: 'The West Virginia state flag, white with a blue border.',
        category: 'US State Flags',
        url: 'flags/West Virginia.png',
      },
      {
        name: 'Vermont',
        description: 'The Vermont state flag, blue with a gold shield.',
        category: 'US State Flags',
        url: 'flags/Vermont.png',
      },
      {
        name: 'Iowa',
        description: 'The Iowa state flag, red, white, and blue.',
        category: 'US State Flags',
        url: 'flags/Iowa.png',
      },
      {
        name: 'New Jersey',
        description: 'The New Jersey state flag, Yellow with a blue shield.',
        category: 'US State Flags',
        url: 'flags/New Jersey.png',
      },
      {
        name: 'Kansas',
        description:
          'The Kansas state flag, blue with a gold sunflower, and the state seal.',
        category: 'US State Flags',
        url: 'flags/Kansas.png',
      },
      {
        name: 'Washington',
        description:
          'The Washington state flag, green with a gold seal with a portrait of George Washington.',
        category: 'US State Flags',
        url: 'flags/Washington.png',
      },
      {
        name: 'Illinois',
        description:
          'The Illinois Flag, white with a blue seal, with the state motto, and a bald eagle.',
        category: 'US State Flags',
        url: 'flags/Illinois.png',
      },
      {
        name: 'Idaho',
        description: 'The Idaho state flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Idaho.png',
      },
      {
        name: 'Nevada',
        description: 'The Nevada state flag, blue with "Battle Born" in gold.',
        category: 'US State Flags',
        url: 'flags/Nevada.png',
      },
      {
        name: 'Alaska',
        description: 'The Alaska Flag, blue with the Big Dipper and Polaris.',
        category: 'US State Flags',
        url: 'flags/Alaska.png',
      },
      {
        name: 'South Carolina',
        description:
          'The South Carolina Flag, blue with a Crescent Moon, and a Palmetto Tree.',
        category: 'US State Flags',
        url: 'flags/South Carolina.png',
      },
      {
        name: 'North Dakota',
        description: 'The North Dakota Flag, blue with a bald eagle.',
        category: 'US State Flags',
        url: 'flags/North Dakota.png',
      },
      {
        name: 'Colorado',
        description: 'The Colorado Flag, blue with a red C.',
        category: 'US State Flags',
        url: 'flags/Colorado.png',
      },
      {
        name: 'Maine',
        description: 'The Maine Flag, blue with the state seal',
        category: 'US State Flags',
        url: 'flags/Maine.png',
      },
      {
        name: 'Oklahoma',
        description: 'The Oklahoma Flag, blue with an native american shield.',
        category: 'US State Flags',
        url: 'flags/Oklahoma.png',
      },
      {
        name: 'Connecticut',
        description: 'The Connecticut Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Connecticut.png',
      },
      {
        name: 'New York',
        description: 'The New York Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/New York.png',
      },
      {
        name: 'Virginia',
        description: 'The Virginia Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Virginia.png',
      },
      {
        name: 'Utah',
        description: 'The Utah Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Utah.png',
      },
      {
        name: 'Louisiana',
        description: 'The Louisiana Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Louisiana.png',
      },
      {
        name: 'South Dakota',
        description: 'The South Dakota Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/South Dakota.png',
      },
      {
        name: 'Indiana',
        description: 'The Indiana Flag, blue with a torch and stars.',
        category: 'US State Flags',
        url: 'flags/Indiana.png',
      },
      {
        name: 'Nebraska',
        description: 'The Nebraska Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Nebraska.png',
      },
      {
        name: 'Montana',
        description: 'The Montana Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Montana.png',
      },
      {
        name: 'Arkansas',
        description: 'The Arkansas Flag, red, with a diamond and stars.',
        category: 'US State Flags',
        url: 'flags/Arkansas.png',
      },
      {
        name: 'Ohio',
        description:
          'The Ohio Flag, blue with a red and white circle, and 17 stars.',
        category: 'US State Flags',
        url: 'flags/Ohio.png',
      },
      {
        name: 'Mississippi',
        description:
          'The Mississippi Flag, red, white, and blue, with a confederate flag.',
        category: 'US State Flags',
        url: 'flags/Mississippi.png',
      },
      {
        name: 'Minnesota',
        description: 'The Minnesota Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Minnesota.png',
      },
      {
        name: 'Maryland',
        description:
          'The Maryland Flag, red, white cross, with a yellow and black checkard design.',
        category: 'US State Flags',
        url: 'flags/Maryland.png',
      },
      {
        name: 'Pennsylvania',
        description: 'The Pennsylvania Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Pennsylvania.png',
      },
      {
        name: 'Wisconsin',
        description: 'The Wisconsin Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Wisconsin.png',
      },
      {
        name: 'North Carolina',
        description:
          'The North Carolina Flag, red, white, and blue. with a star and the date May 20, 1775, and April 12, 1776.',
        category: 'US State Flags',
        url: 'flags/North Carolina.png',
      },
      {
        name: 'Georgia',
        description:
          'The Georgia Flag, red, white, and blue. in blue is the state seal.',
        category: 'US State Flags',
        url: 'flags/Georgia.png',
      },
      {
        name: 'New Hampshire',
        description: 'The New Hampshire Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/New Hampshire.png',
      },
      {
        name: 'Wyoming',
        description: 'The Wyoming Flag, blue with the state seal and a bison.',
        category: 'US State Flags',
        url: 'flags/Wyoming.png',
      },
      {
        name: 'Tennessee',
        description:
          'The Tennessee Flag, red, white, and blue. with a circle and three stars.',
        category: 'US State Flags',
        url: 'flags/Tennessee.png',
      },
      {
        name: 'Hawaii',
        description:
          'The Hawaii Flag, red, white, and blue. with the Union Jack in the corner.',
        category: 'US State Flags',
        url: 'flags/Hawaii.png',
      },
      {
        name: 'Michigan',
        description: 'The Michigan Flag, blue with the state seal.',
        category: 'US State Flags',
        url: 'flags/Michigan.png',
      },
      {
        name: 'Florida',
        description: 'The Florida Flag, white with red cross and seal.',
        category: 'US State Flags',
        url: 'flags/Florida.png',
      },
      {
        name: 'Texas',
        description:
          'The Texas Flag, red, white, and blue. with a single star.',
        category: 'US State Flags',
        url: 'flags/Texas.png',
      },
    ],
    'Dog Images': [
      {
        name: 'Eurasier',
        description: 'Eurasier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Eurasier.jpg',
      },
      {
        name: 'Dalmatian',
        description: 'Dalmatian Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Dalmatian.jpg',
      },
      {
        name: 'English Shepherd',
        description: 'English Shepherd Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/English Shepherd.jpg',
      },
      {
        name: 'Greyhound',
        description: 'Greyhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Greyhound.jpg',
      },
      {
        name: 'Soft Coated Wheaten Terrier',
        description: 'Soft Coated Wheaten Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Soft Coated Wheaten Terrier.jpg',
      },
      {
        name: 'Wirehaired Pointing Griffon',
        description: 'Wirehaired Pointing Griffon Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Wirehaired Pointing Griffon.jpg',
      },
      {
        name: 'Belgian Malinois',
        description: 'Belgian Malinois Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Belgian Malinois.jpg',
      },
      {
        name: 'Cocker Spaniel (American)',
        description: 'Cocker Spaniel (American) Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Cocker Spaniel (American).jpg',
      },
      {
        name: 'Bracco Italiano',
        description: 'Bracco Italiano Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Bracco Italiano.jpg',
      },
      {
        name: 'Anatolian Shepherd Dog',
        description: 'Anatolian Shepherd Dog Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Anatolian Shepherd Dog.jpg',
      },
      {
        name: 'Plott',
        description: 'Plott Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Plott.jpg',
      },
      {
        name: 'Cairn Terrier',
        description: 'Cairn Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Cairn Terrier.jpg',
      },
      {
        name: 'Alaskan Malamute',
        description: 'Alaskan Malamute Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Alaskan Malamute.jpg',
      },
      {
        name: 'Finnish Lapphund',
        description: 'Finnish Lapphund Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Finnish Lapphund.jpg',
      },
      {
        name: 'Yorkshire Terrier',
        description: 'Yorkshire Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Yorkshire Terrier.jpg',
      },
      {
        name: 'Kuvasz',
        description: 'Kuvasz Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Kuvasz.jpg',
      },
      {
        name: 'Papillon',
        description: 'Papillon Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Papillon.jpg',
      },
      {
        name: 'Schipperke',
        description: 'Schipperke Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Schipperke.jpg',
      },
      {
        name: 'Whippet',
        description: 'Whippet Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Whippet.jpg',
      },
      {
        name: 'Briard',
        description: 'Briard Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Briard.jpg',
      },
      {
        name: 'Akita',
        description: 'Akita Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Akita.jpg',
      },
      {
        name: 'American Pit Bull Terrier',
        description: 'American Pit Bull Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/American Pit Bull Terrier.jpg',
      },
      {
        name: 'Boykin Spaniel',
        description: 'Boykin Spaniel Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Boykin Spaniel.jpg',
      },
      {
        name: 'Dogo Argentino',
        description: 'Dogo Argentino Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Dogo Argentino.jpg',
      },
      {
        name: 'German Pinscher',
        description: 'German Pinscher Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/German Pinscher.jpg',
      },
      {
        name: 'Caucasian Shepherd (Ovcharka)',
        description: 'Caucasian Shepherd (Ovcharka) Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Caucasian Shepherd (Ovcharka).jpg',
      },
      {
        name: 'Cane Corso',
        description: 'Cane Corso Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Cane Corso.jpg',
      },
      {
        name: 'Giant Schnauzer',
        description: 'Giant Schnauzer Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Giant Schnauzer.jpg',
      },
      {
        name: 'Pembroke Welsh Corgi',
        description: 'Pembroke Welsh Corgi Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Pembroke Welsh Corgi.jpg',
      },
      {
        name: 'Basset Bleu de Gascogne',
        description: 'Basset Bleu de Gascogne Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Basset Bleu de Gascogne.jpg',
      },
      {
        name: 'Rottweiler',
        description: 'Rottweiler Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Rottweiler.jpg',
      },
      {
        name: 'Great Dane',
        description: 'Great Dane Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Great Dane.jpg',
      },
      {
        name: 'Boston Terrier',
        description: 'Boston Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Boston Terrier.jpg',
      },
      {
        name: 'German Shorthaired Pointer',
        description: 'German Shorthaired Pointer Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/German Shorthaired Pointer.jpg',
      },
      {
        name: 'Chow Chow',
        description: 'Chow Chow Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Chow Chow.jpg',
      },
      {
        name: 'Field Spaniel',
        description: 'Field Spaniel Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Field Spaniel.jpg',
      },
      {
        name: 'Gordon Setter',
        description: 'Gordon Setter Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Gordon Setter.jpg',
      },
      {
        name: 'Bouvier des Flandres',
        description: 'Bouvier des Flandres Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Bouvier des Flandres.jpg',
      },
      {
        name: 'Bullmastiff',
        description: 'Bullmastiff Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Bullmastiff.jpg',
      },
      {
        name: 'Brittany',
        description: 'Brittany Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Brittany.jpg',
      },
      {
        name: 'Pug',
        description: 'Pug Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Pug.jpg',
      },
      {
        name: 'Australian Kelpie',
        description: 'Australian Kelpie Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Australian Kelpie.jpg',
      },
      {
        name: 'Golden Retriever',
        description: 'Golden Retriever Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Golden Retriever.jpg',
      },
      {
        name: 'Affenpinscher',
        description: 'Affenpinscher Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Affenpinscher.jpg',
      },
      {
        name: 'Boxer',
        description: 'Boxer Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Boxer.jpg',
      },
      {
        name: 'Cavalier King Charles Spaniel',
        description: 'Cavalier King Charles Spaniel Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Cavalier King Charles Spaniel.jpg',
      },
      {
        name: 'Welsh Springer Spaniel',
        description: 'Welsh Springer Spaniel Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Welsh Springer Spaniel.jpg',
      },
      {
        name: 'Redbone Coonhound',
        description: 'Redbone Coonhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Redbone Coonhound.jpg',
      },
      {
        name: 'Alapaha Blue Blood Bulldog',
        description: 'Alapaha Blue Blood Bulldog Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Alapaha Blue Blood Bulldog.jpg',
      },
      {
        name: 'Lagotto Romagnolo',
        description: 'Lagotto Romagnolo Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Lagotto Romagnolo.jpg',
      },
      {
        name: 'Clumber Spaniel',
        description: 'Clumber Spaniel Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Clumber Spaniel.jpg',
      },
      {
        name: 'Havanese',
        description: 'Havanese Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Havanese.jpg',
      },
      {
        name: 'Airedale Terrier',
        description: 'Airedale Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Airedale Terrier.jpg',
      },
      {
        name: 'Italian Greyhound',
        description: 'Italian Greyhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Italian Greyhound.jpg',
      },
      {
        name: 'Cardigan Welsh Corgi',
        description: 'Cardigan Welsh Corgi Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Cardigan Welsh Corgi.jpg',
      },
      {
        name: 'Beagle',
        description: 'Beagle Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Beagle.jpg',
      },
      {
        name: 'Harrier',
        description: 'Harrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Harrier.jpg',
      },
      {
        name: 'Lhasa Apso',
        description: 'Lhasa Apso Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Lhasa Apso.jpg',
      },
      {
        name: 'Akbash Dog',
        description: 'Akbash Dog Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Akbash Dog.jpg',
      },
      {
        name: 'Border Terrier',
        description: 'Border Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Border Terrier.jpg',
      },
      {
        name: 'Chinook',
        description: 'Chinook Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Chinook.jpg',
      },
      {
        name: 'West Highland White Terrier',
        description: 'West Highland White Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/West Highland White Terrier.jpg',
      },
      {
        name: 'Labrador Retriever',
        description: 'Labrador Retriever Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Labrador Retriever.jpg',
      },
      {
        name: 'Silky Terrier',
        description: 'Silky Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Silky Terrier.jpg',
      },
      {
        name: 'Samoyed',
        description: 'Samoyed Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Samoyed.jpg',
      },
      {
        name: 'Vizsla',
        description: 'Vizsla Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Vizsla.jpg',
      },
      {
        name: 'Catahoula Leopard Dog',
        description: 'Catahoula Leopard Dog Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Catahoula Leopard Dog.jpg',
      },
      {
        name: 'Azawakh',
        description: 'Azawakh Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Azawakh.jpg',
      },
      {
        name: 'Scottish Deerhound',
        description: 'Scottish Deerhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Scottish Deerhound.jpg',
      },
      {
        name: 'Newfoundland',
        description: 'Newfoundland Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Newfoundland.jpg',
      },
      {
        name: 'Australian Shepherd',
        description: 'Australian Shepherd Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Australian Shepherd.jpg',
      },
      {
        name: 'Bluetick Coonhound',
        description: 'Bluetick Coonhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Bluetick Coonhound.jpg',
      },
      {
        name: 'Black and Tan Coonhound',
        description: 'Black and Tan Coonhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Black and Tan Coonhound.jpg',
      },
      {
        name: 'Maltese',
        description: 'Maltese Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Maltese.jpg',
      },
      {
        name: 'Leonberger',
        description: 'Leonberger Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Leonberger.jpg',
      },
      {
        name: 'Boerboel',
        description: 'Boerboel Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Boerboel.jpg',
      },
      {
        name: 'Great Pyrenees',
        description: 'Great Pyrenees Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Great Pyrenees.jpg',
      },
      {
        name: 'Spanish Water Dog',
        description: 'Spanish Water Dog Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Spanish Water Dog.jpg',
      },
      {
        name: 'American Foxhound',
        description: 'American Foxhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/American Foxhound.jpg',
      },
      {
        name: 'Coton de Tulear',
        description: 'Coton de Tulear Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Coton de Tulear.jpg',
      },
      {
        name: 'Komondor',
        description: 'Komondor Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Komondor.jpg',
      },
      {
        name: 'American Water Spaniel',
        description: 'American Water Spaniel Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/American Water Spaniel.jpg',
      },
      {
        name: 'Bernese Mountain Dog',
        description: 'Bernese Mountain Dog Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Bernese Mountain Dog.jpg',
      },
      {
        name: 'Bedlington Terrier',
        description: 'Bedlington Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Bedlington Terrier.jpg',
      },
      {
        name: 'Irish Wolfhound',
        description: 'Irish Wolfhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Irish Wolfhound.jpg',
      },
      {
        name: 'Rhodesian Ridgeback',
        description: 'Rhodesian Ridgeback Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Rhodesian Ridgeback.jpg',
      },
      {
        name: 'Beauceron',
        description: 'Beauceron Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Beauceron.jpg',
      },
      {
        name: 'Pharaoh Hound',
        description: 'Pharaoh Hound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Pharaoh Hound.jpg',
      },
      {
        name: 'American Eskimo Dog',
        description: 'American Eskimo Dog Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/American Eskimo Dog.jpg',
      },
      {
        name: 'Afghan Hound',
        description: 'Afghan Hound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Afghan Hound.jpg',
      },
      {
        name: 'Keeshond',
        description: 'Keeshond Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Keeshond.jpg',
      },
      {
        name: 'Glen of Imaal Terrier',
        description: 'Glen of Imaal Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Glen of Imaal Terrier.jpg',
      },
      {
        name: 'Norfolk Terrier',
        description: 'Norfolk Terrier Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Norfolk Terrier.jpg',
      },
      {
        name: 'Alaskan Husky',
        description: 'Alaskan Husky Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Alaskan Husky.jpg',
      },
      {
        name: 'Shih Tzu',
        description: 'Shih Tzu Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Shih Tzu.jpg',
      },
      {
        name: 'English Springer Spaniel',
        description: 'English Springer Spaniel Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/English Springer Spaniel.jpg',
      },
      {
        name: 'Japanese Chin',
        description: 'Japanese Chin Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Japanese Chin.jpg',
      },
      {
        name: 'Chinese Crested',
        description: 'Chinese Crested Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Chinese Crested.jpg',
      },
      {
        name: 'Basenji',
        description: 'Basenji Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Basenji.jpg',
      },
      {
        name: 'Irish Setter',
        description: 'Irish Setter Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Irish Setter.jpg',
      },
      {
        name: 'Belgian Tervuren',
        description: 'Belgian Tervuren Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Belgian Tervuren.jpg',
      },
      {
        name: 'Bloodhound',
        description: 'Bloodhound Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Bloodhound.jpg',
      },
      {
        name: 'Miniature Schnauzer',
        description: 'Miniature Schnauzer Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Miniature Schnauzer.jpg',
      },
      {
        name: 'German Shepherd Dog',
        description: 'German Shepherd Dog Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/German Shepherd Dog.jpg',
      },
      {
        name: 'Weimaraner',
        description: 'Weimaraner Dog Breed Image',
        category: 'Dog Images',
        url: 'DogImages/Weimaraner.jpg',
      },
    ],
    Skylines: [
      {
        name: 'Arizona',
        description:
          'An aerial view of the Phoenix skyline, Arizona, at sunset. The Chase Tower, the tallest building in Arizona, is visible in the center of the image. Other notable buildings include the US Bank Center, the Wells Fargo Tower, and the One Arizona Center. The Camelback Mountain is visible in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Arizona.jpg',
      },
      {
        name: 'Alabama',
        description:
          "An image of the REGIONS Building, a 35-story skyscraper in Birmingham, Alabama. The building is the tallest in Alabama and is located in the heart of the city's downtown district. The building is clad in white glass and features a distinctive curved facade.",
        category: 'Us State Skylines',
        url: 'Skylines/Alabama.jpg',
      },
      {
        name: 'California',
        description:
          'An image of the San Diego skyline at night, with the city lights twinkling in the distance. The San Diego Bay is visible in the foreground, while the Coronado Bridge rises in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/California.jpg',
      },
      {
        name: 'Kentucky',
        description:
          'An aerial view of Louisville skyline, Kentucky, at night. The Louisville skyline is visible in the foreground, with the Ohio River flowing through the city. The Louisville skyline is dominated by the PNC Bank Tower, the tallest building in Kentucky. Other notable buildings include the Humana Building, the KFC Yum! Center, and the Louisville Slugger Museum & Factory.',
        category: 'Us State Skylines',
        url: 'Skylines/Kentucky.jpg',
      },
      {
        name: 'Massachusetts',
        description:
          'An image of the Boston skyline at night, with the city lights twinkling in the distance. The Charles River is visible in the foreground, while the Custom House Tower rises in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Massachusetts.jpg',
      },
      {
        name: 'New Mexico',
        description:
          'An image of the New Mexico skyline at sunset, with the Sandia Mountains glowing in the golden light. The city lights are beginning to twinkle in the distance.',
        category: 'Us State Skylines',
        url: 'Skylines/New Mexico.jpg',
      },
      {
        name: 'Delaware',
        description:
          'An image of the Delaware skyline in the day, with the Chase Tower in Wilmington, Delaware, standing tall in the foreground. The Delaware River can be seen winding through the city.',
        category: 'Us State Skylines',
        url: 'Skylines/Delaware.jpg',
      },
      {
        name: 'Missouri',
        description:
          'An image of the Gateway Arch in St. Louis, Missouri, during the day. The Gateway Arch is a stainless steel parabolic arch that stands 630 feet tall and is the tallest man-made monument in the Western Hemisphere. The arch is a popular tourist destination and is a symbol of the city of St. Louis.',
        category: 'Us State Skylines',
        url: 'Skylines/Missouri.jpg',
      },
      {
        name: 'Rhode Island',
        description:
          'An image of the Providence skyline at sunset, with the Providence River winding through the city. The State House of Rhode Island and Providence Plantations, a white marble building with a golden dome, is visible in the foreground. The skyline is also dominated by the Textron Tower, the tallest building in Rhode Island.',
        category: 'Us State Skylines',
        url: 'Skylines/Rhode Island.jpg',
      },
      {
        name: 'Vermont',
        description:
          'An image of the Montpelier skyline during the day, with the Vermont State House standing tall in the foreground and the Green Mountains rising in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Vermont.jpg',
      },
      {
        name: 'Iowa',
        description:
          'An image of the Des Moines skyline at night, with the Principal Financial Group Building, the tallest building in Iowa, in the foreground. Other notable buildings include the Wells Fargo Financial Center, the Nationwide Insurance Tower, and the Greater Des Moines Botanical Garden. The Des Moines River can be seen winding through the city, and the city lights are reflected in the water.',
        category: 'Us State Skylines',
        url: 'Skylines/Iowa.jpg',
      },
      {
        name: 'West Virginia',
        description:
          'An image of the South Side Bridge in Clio, West Virginia, a red truss bridge that spans the Kanawha River. The bridge was built in 1928 and is one of the oldest truss bridges in West Virginia. It is also one of the few remaining truss bridges in the state that is still open to traffic.',
        category: 'Us State Skylines',
        url: 'Skylines/West Virginia.jpg',
      },
      {
        name: 'Oregon',
        description:
          'An image of the Portland skyline from across the Willamette River, with the Steel Bridge in the foreground. The skyline is dominated by the Wells Fargo Center, the tallest building in Oregon. Other notable buildings include the US Bancorp Tower, the KOIN Center, and the Portland Building. The Willamette River winds through the city, and the city lights are reflected in the water.',
        category: 'Us State Skylines',
        url: 'Skylines/Oregon.jpg',
      },
      {
        name: 'Washington',
        description:
          'An image of the Seattle skyline with Mount Rainier in the background. The Space Needle rises above the city skyline, and Mount Rainier is visible in the distance, its snow-capped peak gleaming in the sunlight. The Puget Sound is visible in the foreground, and the Olympic Mountains can be seen in the distance to the left.',
        category: 'Us State Skylines',
        url: 'Skylines/Washington.jpg',
      },
      {
        name: 'Kansas',
        description:
          'An image of the Kansas City skyline during the day, with the One Kansas City Place tower in the foreground. The skyline is also dominated by the KCTV 5 Tower, the City Hall, and the Liberty Memorial.',
        category: 'Us State Skylines',
        url: 'Skylines/Kansas.jpg',
      },
      {
        name: 'New Jersey',
        description:
          'An image of the Liberty State Park skyline in New Jersey during the day, with the Jersey City skyline in the background and the Hudson River in the foreground.',
        category: 'Us State Skylines',
        url: 'Skylines/New Jersey.jpg',
      },
      {
        name: 'Illinois',
        description:
          'An image of the Chicago skyline at night, with the Willis Tower standing tall in the foreground. The Chicago River winds through the city, and the city lights are reflected in the water. Other notable buildings in the skyline include the Trump International Hotel and Tower, the John Hancock Center, and the Wrigley Building.',
        category: 'Us State Skylines',
        url: 'Skylines/Illinois.jpg',
      },
      {
        name: 'Idaho',
        description:
          'An image of the Boise skyline in the day, with the Chase Tower in the foreground. Other notable buildings in the skyline include the Zions Bank Building and the Idaho State Capitol. The Boise Mountains can be seen rising in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Idaho.jpg',
      },
      {
        name: 'Nevada',
        description:
          'An image of the Las Vegas Strip at night, with the Bellagio Fountains in the foreground. Other notable buildings in the skyline include the Stratosphere Tower, the Luxor Hotel and Casino, and the Venetian Resort.',
        category: 'Us State Skylines',
        url: 'Skylines/Nevada.jpg',
      },
      {
        name: 'Alaska',
        description:
          'An image of a foggy street with cars and a streetlight in the center. The streetlight casts a warm glow on the fog, and the headlights of the cars illuminate the street ahead. The fog obscures the buildings',
        category: 'Us State Skylines',
        url: 'Skylines/Alaska.jpg',
      },
      {
        name: 'North Dakota',
        description:
          'An image of the Fargo skyline at night, with the Red River in the foreground and the Fargo-Moorhead Metropolitan Floodway behind it. The skyline is dominated by the Wells Fargo Tower, the tallest building in North Dakota. Other notable buildings include the US Bank Center, the Renaissance Fargo Hotel and Spa, and the Plains Commerce Center. The city lights are reflected in the Red River, and the Fargo-Moorhead Metropolitan Floodway is visible in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/North Dakota.jpg',
      },
      {
        name: 'South Carolina',
        description:
          'An image of a city skyline with a green field in the foreground. The skyline is dominated by tall office buildings, with some residential and retail buildings mixed in. The green field is a park. The sky is blue and clear',
        category: 'Us State Skylines',
        url: 'Skylines/South Carolina.jpg',
      },
      {
        name: 'Colorado',
        description:
          'An image of the Denver skyline during the day, with the Wells Fargo Center in the foreground. Other notable buildings in the skyline include the Republic Plaza, the 1800 Larimer Street, and the 1001 17th Street. The city is surrounded by flat land, and the buildings are reflected in the glass and metal facades. The sky is blue and clear, and the sun is shining.',
        category: 'Us State Skylines',
        url: 'Skylines/Colorado.jpg',
      },
      {
        name: 'Maine',
        description:
          'A view of the Augusta, Maine skyline from across the Kennebec River. The skyline is dominated by the white marble State House, with its golden dome and columns. Other notable landmarks include the brick and granite Kennebec County Courthouse, the United States Customhouse, and the Cony High School building. The river is dotted with boats, and the city is surrounded by rolling hills and trees.',
        category: 'Us State Skylines',
        url: 'Skylines/Maine.jpg',
      },
      {
        name: 'Oklahoma',
        description:
          'A view of the Oklahoma City skyline from a distance. The skyline is dominated by the Devon Energy Center, with its silver and glass skyscraper. Other notable landmarks include the Chase Tower, the Oklahoma City National Memorial & Museum, and the Cox Convention Center. ',
        category: 'Us State Skylines',
        url: 'Skylines/Oklahoma.jpg',
      },
      {
        name: 'Connecticut',
        description:
          'A view of the Connecticut skyline from across the Connecticut River. The skyline is dominated by the gold-domed Connecticut State Capitol, with its white marble columns and pediments. Other notable landmarks include the Travelers Tower, the CityPlace I skyscraper, and the Hartford XL Center. The river is dotted with boats, and the city is surrounded by rolling hills and trees.',
        category: 'Us State Skylines',
        url: 'Skylines/Connecticut.jpg',
      },
      {
        name: 'New York',
        description:
          'An aerial view of the New York City skyline from the East River. Prominent landmarks include One World Trade Center, the Empire State Building, the Chrysler Building, and the Rockefeller Center. The Statue of Liberty is visible in the distance, and the city is surrounded by water on all sides.',
        category: 'Us State Skylines',
        url: 'Skylines/New York.jpg',
      },
      {
        name: 'Virginia',
        description:
          'An aerial view of the Richmond, Virginia skyline from the James River. The skyline is dominated by the Virginia State Capitol, with its white marble dome and columns. Other notable landmarks include the SunTrust Center skyscraper, the James Center, and the Federal Reserve Bank of Richmond. The river is dotted with boats, and the city is surrounded by rolling hills and trees.',
        category: 'Us State Skylines',
        url: 'Skylines/Virginia.jpg',
      },
      {
        name: 'Utah',
        description:
          'A panoramic view of the Utah skyline with snow-capped mountains in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Utah.jpg',
      },
      {
        name: 'Louisiana',
        description:
          'The Louisiana Skyline at Night, showing the Superdome and other important buildings',
        category: 'Us State Skylines',
        url: 'Skylines/Louisiana.jpg',
      },
      {
        name: 'South Dakota',
        description:
          'Aerial view of Rapid City, South Dakota, surrounded by trees, showing important buildings such as the South Dakota School of Mines and Technology, Mount Rushmore National Memorial, and the Crazy Horse Memorial.',
        category: 'Us State Skylines',
        url: 'Skylines/South Dakota.jpg',
      },
      {
        name: 'Indiana',
        description:
          "The Indiana skyline at night, showing important buildings such as the Soldiers' and Sailors' Monument, Chase Tower, and One America Tower.",
        category: 'Us State Skylines',
        url: 'Skylines/Indiana.jpg',
      },
      {
        name: 'Montana',
        description:
          'The skyline of downtown Billings, Montana, showing important buildings such as the Crowne Plaza Billings, Wells Fargo Center, and First Interstate Center.',
        category: 'Us State Skylines',
        url: 'Skylines/Montana.jpg',
      },
      {
        name: 'Nebraska',
        description:
          'The Nebraska Skyline, showing important buildings such as the Union Pacific Center, the First National Bank Tower, and the Woodmen Tower.',
        category: 'Us State Skylines',
        url: 'Skylines/Nebraska.jpg',
      },
      {
        name: 'Arkansas',
        description:
          'A view of the Little Rock, Arkansas skyline at sunset, showing the following buildings: Arkansas State Capitol Building, Regions Center, Acxiom Building, One Capitol Mall, Union National Bank Building, Arkansas Federal Reserve Bank Building, Riverfront Park.',
        category: 'Us State Skylines',
        url: 'Skylines/Arkansas.jpg',
      },
      {
        name: 'Ohio',
        description:
          'The Columbus, Ohio skyline at night, with the Scioto River in the foreground. Important buildings in the image include the Rhodes State Office Tower, the Huntington Center, and the LeVeque Tower.',
        category: 'Us State Skylines',
        url: 'Skylines/Ohio.jpg',
      },
      {
        name: 'Mississippi',
        description:
          'The Jackson, Mississippi skyline at night, with the Pearl River and the I-55 bridge in the foreground. Important buildings in the image include the Trustmark Building, the Regions Tower, and the One Jackson Place.',
        category: 'Us State Skylines',
        url: 'Skylines/Mississippi.jpg',
      },
      {
        name: 'Minnesota',
        description:
          'The Minneapolis, Minnesota skyline at sunset, with the Mississippi River and the Stone Arch Bridge in the foreground. Important buildings in the image include the IDS Center, the Wells Fargo Place, and the Capella Tower.',
        category: 'Us State Skylines',
        url: 'Skylines/Minnesota.jpg',
      },
      {
        name: 'Pennsylvania',
        description:
          'The Pittsburgh, Pennsylvania skyline at sunset, with the Allegheny River and the Monongahela River in the foreground. Important buildings in the image include the U.S. Steel Tower, the PPG Place, and the PNC Place.',
        category: 'Us State Skylines',
        url: 'Skylines/Pennsylvania.jpg',
      },
      {
        name: 'Maryland',
        description:
          'Maryland skyline at night, featuring the Inner Harbor, Chesapeake Bay, Domino Sugar Factory, Transamerica Tower, and U.S. Bank Tower.',
        category: 'Us State Skylines',
        url: 'Skylines/Maryland.jpg',
      },
      {
        name: 'Wisconsin',
        description:
          'Wisconsin skyline, featuring the Milwaukee Art Museum, Milwaukee Waterfront, and Lake Michigan.',
        category: 'Us State Skylines',
        url: 'Skylines/Wisconsin.jpg',
      },
      {
        name: 'Georgia',
        description:
          'Image of the Atlanta skyline at night, featuring the tallest buildings in the city, including the Bank of America Plaza, Truist Plaza, and Mercedes-Benz Stadium.',
        category: 'Us State Skylines',
        url: 'Skylines/Georgia.jpg',
      },
      {
        name: 'North Carolina',
        description:
          'Image of the Charlotte skyline at night, featuring the Bank of America Tower, Truist Center, and Wells Fargo Center.',
        category: 'Us State Skylines',
        url: 'Skylines/North Carolina.jpg',
      },
      {
        name: 'Wyoming',
        description:
          'Image of the Cheyenne skyline, featuring the Cheyenne Depot Museum and clock tower, and a train.',
        category: 'Us State Skylines',
        url: 'Skylines/Wyoming.jpg',
      },
      {
        name: 'New Hampshire',
        description:
          'Image of an empty street with the North Church clock tower in the background, Portsmouth, New Hampshire.',
        category: 'Us State Skylines',
        url: 'Skylines/New Hampshire.jpg',
      },
      {
        name: 'Tennessee',
        description:
          'Image of the Downtown Nashville Skyline, Tennessee, with the Cumberland River in the foreground.',
        category: 'Us State Skylines',
        url: 'Skylines/Tennessee.jpg',
      },
      {
        name: 'Hawaii',
        description:
          'Image of the Waikiki skyline at night, Hawaii, with the Pacific Ocean in the foreground and the Ala Moana Hotel and Diamond Head in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Hawaii.jpg',
      },
      {
        name: 'Michigan',
        description:
          'Image of the Detroit skyline during the day, featuring the Detroit River in the foreground and the Renaissance Center, Comerica Tower, and One Detroit Center in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Michigan.jpg',
      },
      {
        name: 'Florida',
        description:
          'Image of the Miami skyline during the day, featuring the Miami River in the foreground and the Freedom Tower, Panorama Tower, and One Thousand Museum in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Florida.jpg',
      },
      {
        name: 'Texas',
        description:
          'Image of the Dallas skyline during the day, featuring the Reunion Tower, Bank of America Plaza, and Comerica Tower in the background.',
        category: 'Us State Skylines',
        url: 'Skylines/Texas.jpg',
      },
    ],
  },
  Sounds: {
    Animals: [
      {
        name: 'cow',
        description: 'cow moo',
        category: 'Animals',
        url: 'moo.ogg',
      },
      {
        name: 'dog',
        description: 'dogs bark',
        category: 'Animals',
        url: 'dog.ogg',
      },
      {
        name: 'pig',
        description: 'pigs oink',
        category: 'Animals',
        url: 'pig.ogg',
      },
      {
        name: 'rooster',
        description: 'rooster crow',
        category: 'Animals',
        url: 'rooster.ogg',
      },
      {
        name: 'cat',
        description: 'cat meow',
        category: 'Animals',
        url: 'cat.ogg',
      },
    ],
    Notifications: [
      {
        name: 'bell',
        description: 'bell',
        category: 'Notifications',
        url: 'bell.ogg',
      },
      {
        name: 'hollow bell notification',
        description: 'hollow_bell_notification',
        category: 'Notifications',
        url: 'hollow_bell_notification.ogg',
      },
      {
        name: 'positive',
        description: 'Positive notification sound',
        category: 'Notifications',
        url: 'positive.ogg',
      },
      {
        name: 'harp downscale 1',
        description: 'Harp downscale notification sound',
        category: 'Notifications',
        url: 'harp_downscale_1.ogg',
      },
    ],
    'Game Effects': [
      {
        name: 'coin 3',
        description: 'Coin pickup sound',
        category: 'Game Effects',
        url: 'coin_3.ogg',
      },
      {
        name: 'collect item bling 1',
        description: 'Item collection sound',
        category: 'Game Effects',
        url: 'collect_item_bling_1.ogg',
      },
      {
        name: 'power down 2',
        description: 'Power-down sound',
        category: 'Game Effects',
        url: 'power_down_2.ogg',
      },
      {
        name: 'arcade game jump 1',
        description: 'Jump sound in arcade game',
        category: 'Game Effects',
        url: 'arcade_game_jump_1.ogg',
      }, // ... additional game effect sounds
      {
        name: 'coin 2',
        description: 'Another coin pickup sound',
        category: 'Game Effects',
        url: 'coin_2.ogg',
      },
      {
        name: 'coin',
        description: 'Basic coin pickup sound',
        category: 'Game Effects',
        url: 'coin.ogg',
      },
      {
        name: 'vibrant wrong action hit 1',
        description: 'Wrong action hit sound',
        category: 'Game Effects',
        url: 'vibrant_wrong_action_hit_1.ogg',
      },
      {
        name: 'hop',
        description: 'Hop sound',
        category: 'Game Effects',
        url: 'hop.ogg',
      },
      {
        name: 'whoosh 4',
        description: 'Whoosh sound',
        category: 'Game Effects',
        url: 'whoosh_4.ogg',
      },
      {
        name: 'retro game enemy',
        description: 'Retro game enemy sound',
        category: 'Game Effects',
        url: 'retro_game_enemy.ogg',
      },
      {
        name: 'retro game enemy spawn 7',
        description: 'Retro game enemy spawn sound',
        category: 'Game Effects',
        url: 'retro_game_enemy_spawn_7.ogg',
      },
      {
        name: 'vibrant game',
        description: 'Vibrant game sound',
        category: 'Game Effects',
        url: 'vibrant_game.ogg',
      },
      {
        name: 'vibrant game cartoon start game 2 long',
        description: 'Cartoon start game sound',
        category: 'Game Effects',
        url: 'vibrant_game_cartoon_start_game_2_long.ogg',
      },
      {
        name: 'lighthearted bonus objective 1',
        description: 'Bonus objective sound',
        category: 'Game Effects',
        url: 'lighthearted_bonus_objective_1.ogg',
      },
    ],
    Ambience: [
      {
        name: 'vibrant game harping down forever loop 1',
        description: 'Harping down loop sound',
        category: 'Ambience',
        url: 'vibrant_game_harping_down_forever_loop_1.ogg',
      },
      {
        name: 'forest woodland loop',
        description: 'forest woodland loop',
        category: 'Ambience',
        url: 'forest_woodland_loop.ogg',
      },
      {
        name: 'stabilizing breath loop1',
        description: 'stabilizing breath loop1',
        category: 'Ambience',
        url: 'stabilizing_breath_loop1.ogg',
      },
      {
        name: 'lightup',
        description: 'Light up ambient sound',
        category: 'Ambience',
        url: 'lightup.ogg',
      },
      {
        name: 'bubble pop cluster 2',
        description: 'Bubble pop cluster sound',
        category: 'Ambience',
        url: 'bubble_pop_cluster_2.ogg',
      },
    ],
    'Rings And Alarms': [
      {
        name: 'ring 1',
        description: 'Ring sound 1',
        category: 'Rings And Alarms',
        url: 'ring_1.ogg',
      },
      {
        name: 'ring 2',
        description: 'Ring sound 2',
        category: 'Rings And Alarms',
        url: 'ring_2.ogg',
      },
    ],
    'Puzzles and Games': [
      {
        name: 'puzzle game accent small d 01',
        description: 'Puzzle game accent',
        category: 'Puzzles and Games',
        url: 'puzzle_game_accent_small_d_01.ogg',
      },
      {
        name: 'puzzle game accent small d 02',
        description: 'Puzzle game accent',
        category: 'Puzzles and Games',
        url: 'puzzle_game_accent_small_d_02.ogg',
      },
      {
        name: 'puzzle game accent a 01',
        description: 'Puzzle game accent A',
        category: 'Puzzles and Games',
        url: 'puzzle_game_accent_a_01.ogg',
      },
      {
        name: 'vibrant game positive item 2',
        description: 'Vibrant game positive item sound',
        category: 'Puzzles and Games',
        url: 'vibrant_game_positive_item_2.ogg',
      },
    ],
    'UI Interactions': [
      {
        name: 'app button 1',
        description: 'App button click',
        category: 'UI Interactions',
        url: 'app_button_1.ogg',
      },
      {
        name: 'sharp switch',
        description: 'Switch toggle',
        category: 'UI Interactions',
        url: 'sharp_switch.ogg',
      },
    ],
  },
  CSVs: {
    Animals: [
      {
        name: 'Cats',
        description: 'Information about various breeds of cats.',
        category: 'Animals',
        url: 'Cats.csv',
      },
      {
        name: 'Dogs',
        description: 'Data on different kinds of dog breeds.',
        category: 'Animals',
        url: 'Dogs.csv',
      },
    ],
    Art: [
      {
        name: 'Tate Museum Artworks',
        description: 'Listing of artworks in the Tate Museum.',
        category: 'Art',
        url: 'Tate Museum Artworks.csv',
      },
    ],
    'Culture and Entertainment': [
      {
        name: 'Best Selling Video Games',
        description: 'Sales data for top video games.',
        category: 'Culture and Entertainment',
        url: 'Best Selling Video Games.csv',
      },
      {
        name: 'Board Games',
        description: 'Information on popular board games.',
        category: 'Culture and Entertainment',
        url: 'Board Games.csv',
      },
      {
        name: 'Grammy Winners',
        description: 'Grammy winners from 1959 to 2019.',
        category: 'Culture and Entertainment',
        url: 'Grammy Winners.csv',
      },
      {
        name: 'Most Followed Instagram Accounts',
        description: 'Most followed Instagram accounts.',
        category: 'Culture and Entertainment',
        url: 'Most Followed Instagram Accounts.csv',
      },
      {
        name: 'Netflix Content',
        description: 'Listing of Netflix content.',
        category: 'Culture and Entertainment',
        url: 'Netflix Content.csv',
      },
      {
        name: 'Oscar Winners',
        description: 'Oscar winners from 1927 to 2019.',
        category: 'Culture and Entertainment',
        url: 'Oscar Winners.csv',
      },
      {
        name: 'RollingStone 500 Albums',
        description: "Rolling Stone's 500 Greatest Albums of All Time.",
        category: 'Culture and Entertainment',
        url: 'RollingStone 500 Albums.csv',
      },
      {
        name: 'TheRoot 100 Influential African Americans',
        description: "The Root's 100 most influential African Americans.",
        category: 'Culture and Entertainment',
        url: 'TheRoot 100 Influential African Americans.csv',
      },
    ],
    Geography: [
      {
        name: 'Countries and Territories',
        description: 'Listing of countries and territories.',
        category: 'Geography',
        url: 'Countries and Territories.csv',
      },
      {
        name: 'US Agricultural Crops',
        description: 'US agricultural crop production.',
        category: 'Geography',
        url: 'US Agricultural Crops.csv',
      },
      {
        name: 'US National Parks',
        description: 'Listing of US national parks.',
        category: 'Geography',
        url: 'US National Parks.csv',
      },
      {
        name: 'US States',
        description: 'Listing of US states.',
        category: 'Geography',
        url: 'US States.csv',
      },
      {
        name: "World's Tallest Mountains",
        description: "Listing of the world's tallest mountains.",
        category: 'Geography',
        url: "World's Tallest Mountains.csv",
      },
    ],
    'Language and Literature': [
      {
        name: 'American Sign Language Alphabet',
        description: 'American Sign Language alphabet.',
        category: 'Language and Literature',
        url: 'American Sign Language Alphabet.csv',
      },
      {
        name: 'Most Spoken Languages Worldwide',
        description: 'Most spoken languages worldwide.',
        category: 'Language and Literature',
        url: 'Most Spoken Languages Worldwide.csv',
      },
      {
        name: 'New York Times Bestsellers 2011-2018',
        description: 'New York Times bestsellers from 2011 to 2018.',
        category: 'Language and Literature',
        url: 'New York Times Bestsellers 2011-2018.csv',
      },
      {
        name: 'Words',
        description: 'Listing of words.',
        category: 'Language and Literature',
        url: 'Words.csv',
      },
    ],
    Miscellaneous: [
      {
        name: 'American Ninja Warrior Obstacles',
        description: 'American Ninja Warrior obstacles.',
        category: 'Miscellaneous',
        url: 'American Ninja Warrior Obstacles.csv',
      },
      {
        name: 'AP Computer Science Test Taker Demographics by State (2019)',
        description: 'AP Computer Science test taker demographics by state.',
        category: 'Miscellaneous',
        url: 'AP Computer Science Test Taker Demographics by State (2019).csv',
      },
      {
        name: 'Ivy League Universities',
        description: 'Listing of Ivy League universities.',
        category: 'Miscellaneous',
        url: 'Ivy League Universities.csv',
      },
      {
        name: 'NYC Public Wifi Locations',
        description: 'Listing of NYC public wifi locations.',
        category: 'Miscellaneous',
        url: 'NYC Public Wifi Locations.csv',
      },
      {
        name: 'Target Store Locations',
        description: 'Listing of Target store locations.',
        category: 'Miscellaneous',
        url: 'Target Store Locations.csv',
      },
      {
        name: 'US Incarcerated Population, Per Race, Ethnicity, and Region',
        description:
          'Statistics on the U.S. incarcerated population broken down by race, ethnicity, and region.',
        category: 'Miscellaneous',
        url: 'US Incarcerated Population, Per Race, Ethnicity, and Region.csv',
      },
      {
        name: "World's Tallest Buildings",
        description:
          "Information on the world's tallest buildings including their height and location.",
        category: 'Miscellaneous',
        url: "World's Tallest Buildings.csv",
      },
    ],
    Other: [
      {
        name: 'GoogleTrendsChocolate',
        description: 'Google Trends data related to searches for chocolate.',
        category: 'Other',
        url: 'GoogleTrendsChocolate.csv',
      },
      {
        name: 'Student Info',
        description:
          'Information about students including grades and attendance.',
        category: 'Other',
        url: 'Student Info.csv',
      },
    ],
    Politics: [
      {
        name: 'Female State Legislators',
        description: 'List of female state legislators in the U.S.',
        category: 'Politics',
        url: 'Female State Legislators.csv',
      },
      {
        name: 'US 2016 Presidential Election Results',
        description: 'Results of the U.S. 2016 Presidential election by state.',
        category: 'Politics',
        url: 'US 2016 Presidential Election Results.csv',
      },
      {
        name: 'US Congressional Members',
        description:
          'Current members of the U.S. Congress, including their states and districts.',
        category: 'Politics',
        url: 'US Congressional Members.csv',
      },
      {
        name: 'US Presidents',
        description:
          'List of all U.S. Presidents, their terms, and affiliations.',
        category: 'Politics',
        url: 'US Presidents.csv',
      },
      {
        name: 'US Supreme Court Justices',
        description:
          'List of U.S. Supreme Court Justices, including their tenures.',
        category: 'Politics',
        url: 'US Supreme Court Justices.csv',
      },
      {
        name: 'US Women Running for Elected Office in 2020',
        description:
          'List of women who ran for elected office in the U.S. in 2020.',
        category: 'Politics',
        url: 'US Women Running for Elected Office in 2020.csv',
      },
      {
        name: 'World Democracy Index',
        description:
          'Global index ranking countries based on the health of their democracies.',
        category: 'Politics',
        url: 'World Democracy Index.csv',
      },
    ],
    Science: [
      {
        name: 'African American Inventors and Scientists',
        description:
          'List of notable African American inventors and scientists.',
        category: 'Science',
        url: 'African American Inventors and Scientists.csv',
      },
      {
        name: 'Cereal Nutrition',
        description: 'Nutritional information for various cereals.',
        category: 'Science',
        url: 'Cereal Nutrition.csv',
      },
      {
        name: 'COVID-19 Cases per Country',
        description: 'Statistics on COVID-19 cases by country.',
        category: 'Science',
        url: 'COVID-19 Cases per Country.csv',
      },
      {
        name: 'COVID-19 Cases per US State',
        description: 'Statistics on COVID-19 cases by U.S. state.',
        category: 'Science',
        url: 'COVID-19 Cases per US State.csv',
      },
      {
        name: 'Daily Weather',
        description: 'Daily weather data from various locations.',
        category: 'Science',
        url: 'Daily Weather.csv',
      },
      {
        name: 'Dinosaur Fossils',
        description: 'Information about various dinosaur fossils.',
        category: 'Science',
        url: 'Dinosaur Fossils.csv',
      },
      {
        name: 'Nobel Prize Winners 1901-2016',
        description: 'List of Nobel Prize winners from 1901 to 2016.',
        category: 'Science',
        url: 'Nobel Prize Winners 1901-2016.csv',
      },
      {
        name: 'Periodic Table Elements',
        description: 'Information about the elements in the Periodic Table.',
        category: 'Science',
        url: 'Periodic Table Elements.csv',
      },
      {
        name: 'Planets of our Solar System',
        description: 'Information about the planets in our solar system.',
        category: 'Science',
        url: 'Planets of our Solar System.csv',
      },
      {
        name: 'Rollercoasters',
        description: 'Data about various rollercoasters around the world.',
        category: 'Science',
        url: 'Rollercoasters.csv',
      },
      {
        name: 'Volcano Eruptions',
        description:
          'Data on volcano eruptions including location and magnitude.',
        category: 'Science',
        url: 'Volcano Eruptions.csv',
      },
    ],
    Sports: [
      {
        name: 'Baseball Teams',
        description: 'List of professional baseball teams.',
        category: 'Sports',
        url: 'Baseball Teams.csv',
      },
      {
        name: "FIFA Men's World Cup Results",
        description: "Results of the FIFA Men's World Cup by year.",
        category: 'Sports',
        url: "FIFA Men's World Cup Results.csv",
      },
      {
        name: "FIFA Women's World Cup Results",
        description: "Results of the FIFA Women's World Cup by year.",
        category: 'Sports',
        url: "FIFA Women's World Cup Results.csv",
      },
      {
        name: 'NBA Teams',
        description: 'List of National Basketball Association teams.',
        category: 'Sports',
        url: 'NBA Teams.csv',
      },
      {
        name: 'NCAA Division I Teams',
        description: 'List of NCAA Division I college sports teams.',
        category: 'Sports',
        url: 'NCAA Division I Teams.csv',
      },
      {
        name: 'NFL Teams',
        description: 'List of National Football League teams.',
        category: 'Sports',
        url: 'NFL Teams.csv',
      },
      {
        name: 'NHL Teams',
        description: 'List of National Hockey League teams.',
        category: 'Sports',
        url: 'NHL Teams.csv',
      },
      {
        name: 'Olympic Medals',
        description: 'List of Olympic medal winners by event and country.',
        category: 'Sports',
        url: 'Olympic Medals.csv',
      },
      {
        name: 'WNBA Teams',
        description: "List of Women's National Basketball Association teams.",
        category: 'Sports',
        url: 'WNBA Teams.csv',
      },
    ],
    'Spotify Charts': [
      {
        name: 'Top 200 USA',
        description: 'Top 200 most streamed songs in the USA.',
        category: 'Spotify Charts',
        url: 'Top 200 USA.csv',
      },
      {
        name: 'Top 200 Worldwide',
        description: 'Top 200 most streamed songs worldwide.',
        category: 'Spotify Charts',
        url: 'Top 200 Worldwide.csv',
      },
      {
        name: 'Viral 50 USA',
        description: 'Top 50 viral songs in the USA.',
        category: 'Spotify Charts',
        url: 'Viral 50 USA.csv',
      },
      {
        name: 'Viral 50 Worldwide',
        description: 'Top 50 viral songs worldwide.',
        category: 'Spotify Charts',
        url: 'Viral 50 Worldwide.csv',
      },
    ],
    Transportation: [
      {
        name: 'Boston Bike Share Rentals',
        description: 'Data on bike share rentals in Boston.',
        category: 'Transportation',
        url: 'Boston Bike Share Rentals.csv',
      },
      {
        name: 'Busiest Airports',
        description: 'List of the busiest airports by passenger traffic.',
        category: 'Transportation',
        url: 'Busiest Airports.csv',
      },
      {
        name: 'Major US Airlines',
        description: 'List of major airlines in the United States.',
        category: 'Transportation',
        url: 'Major US Airlines.csv',
      },
    ],
  },
};
