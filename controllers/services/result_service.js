const Result = require ('../../models/Result')

class PlacesPoints {
    setRatingPoints(Result) {

    }

    getPointsByPlace(place) {
        let ratingPoints = 0;
        switch (place) {
            case 1 :
                ratingPoints = 36;
                break;
            case 2 :
                ratingPoints = 33;
                break;
            case 3 :
                ratingPoints = 30;
                break;
            case 4 :
                ratingPoints = 27;
                break;
            case 5 :
                ratingPoints = 25;
                break;
            case 6 :
                ratingPoints = 23;
                break;
            case 7 :
                ratingPoints = 21;
                break;
            case 8 :
                ratingPoints = 19;
                break;
            case 9 :
                ratingPoints = 16;
                break;
            case 10 :
                ratingPoints = 15;
                break;
            case    11    :
                ratingPoints = 14;
                break;
            case 12 :
                ratingPoints = 13;
                break;
            case 13:
                ratingPoints = 12;
                break;
            case 14:
                ratingPoints = 11;
                break;
            case 15 :
                ratingPoints = 10;
                break;
            case 16 :
                ratingPoints = 9;
                break;
            case 17 :
                ratingPoints = 8;
                break;
            case 18 :
                ratingPoints = 7;
                break;
            case 19 :
                ratingPoints = 6;
                break;
            case 20 :
                ratingPoints = 5;
                break;
            case 21 :
                ratingPoints = 4;
                break;
            case 22 :
                ratingPoints = 3;
                break;
            case    23    :
                ratingPoints = 2;
                break;
            case    24    :
                ratingPoints = 1;
                break;
        }
        return ratingPoints;
    }
}

module.exports = new PlacesPoints()
