import datetime

import myEnedis
import messages

__version__ = "test_saniho"

def test(myDataEnedis):
    myDataEnedis.updateCurrentWeek()
    myDataEnedis.updateCurrentWeek()
    myDataEnedis.updateCurrentWeek()
    myDataEnedis.update()
def test1(myDataEnedis):


    " Gestion du cas ou la requete yesrday ne donne rien"
    #data = {'error': 'result_400', 'enedis_return': {'error': 'Invalid_request', 'error_description': 'Start date should be before end date.', 'error_uri': 'https://bluecoder.enedis.fr/api-doc/consulter-souscrire'}}
    #myDataEnedis.updateYesterday( data )
    #data = {'error': 'result_404', 'enedis_return': {'error': 'no_data_found', 'error_description': 'no measure found for this usage point', 'error_uri': 'https://bluecoder.enedis.fr/api-doc/consulter-souscrire'}}
    #myDataEnedis.updateYesterday(data)
    #data = {"meter_reading":{"usage_point_id":"25869464529695","start":"2020-11-12","end":"2020-11-13","quality":"BRUT","interval_reading":[{"value":"1142","date":"2020-11-12 00:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"1854","date":"2020-11-12 01:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"3366","date":"2020-11-12 01:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"4224","date":"2020-11-12 02:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"4132","date":"2020-11-12 02:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"3898","date":"2020-11-12 03:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"2852","date":"2020-11-12 03:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"826","date":"2020-11-12 04:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"986","date":"2020-11-12 04:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"1722","date":"2020-11-12 05:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"1742","date":"2020-11-12 05:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"716","date":"2020-11-12 06:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"756","date":"2020-11-12 06:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"1502","date":"2020-11-12 07:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"1314","date":"2020-11-12 07:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"792","date":"2020-11-12 08:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"668","date":"2020-11-12 08:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"670","date":"2020-11-12 09:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"678","date":"2020-11-12 09:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"702","date":"2020-11-12 10:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"724","date":"2020-11-12 10:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"4394","date":"2020-11-12 11:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"4034","date":"2020-11-12 11:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"1830","date":"2020-11-12 12:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"682","date":"2020-11-12 12:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"846","date":"2020-11-12 13:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"860","date":"2020-11-12 13:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"906","date":"2020-11-12 14:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"1944","date":"2020-11-12 14:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"2218","date":"2020-11-12 15:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"1090","date":"2020-11-12 15:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"822","date":"2020-11-12 16:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"832","date":"2020-11-12 16:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"912","date":"2020-11-12 17:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"874","date":"2020-11-12 17:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"1760","date":"2020-11-12 18:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"3484","date":"2020-11-12 18:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"1892","date":"2020-11-12 19:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"856","date":"2020-11-12 19:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"922","date":"2020-11-12 20:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"1598","date":"2020-11-12 20:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"902","date":"2020-11-12 21:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"894","date":"2020-11-12 21:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"916","date":"2020-11-12 22:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"2096","date":"2020-11-12 22:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"2128","date":"2020-11-12 23:00:00","interval_length":"PT30M","measure_type":"B"},{"value":"1376","date":"2020-11-12 23:30:00","interval_length":"PT30M","measure_type":"B"},{"value":"866","date":"2020-11-13 00:00:00","interval_length":"PT30M","measure_type":"B"}],"reading_type":{"unit":"W","measurement_kind":"power","aggregate":"average"}}}
    response = myDataEnedis.updateDataYesterdayHCHP()
    #print(response)
    print(myDataEnedis.getYesterdayHC())
    print(myDataEnedis.getYesterdayHP())
    print(myDataEnedis.getHCCost(myDataEnedis.getYesterdayHC()))
    print(myDataEnedis.getHPCost(myDataEnedis.getYesterdayHP()))
    #print(1/0)
    #myDataEnedis.updateCurrentWeek()
    #print(1/0)
    #myDataEnedis.updateCurrentMonth()
    #myDataEnedis.update()
    print( myDataEnedis.getYesterday(),
           myDataEnedis.getCurrentMonth(),
           myDataEnedis.getLastMonth(),
           myDataEnedis.getLastMonthLastYear(),
           myDataEnedis.getCurrentWeek(),
           myDataEnedis.getLastWeek(),
           myDataEnedis.getLast7Days(),
           myDataEnedis.getCurrentYear(),
           myDataEnedis.getLastYear() )
    print( myDataEnedis.getTimeLastCall(), myDataEnedis.getLastUpdate(), myDataEnedis.getStatusLastCall())
    print( myDataEnedis.getErrorLastCall())
    print("HC/HP")
    print( myDataEnedis.getYesterdayHC())
    print( myDataEnedis.getYesterdayHP())
    #last7days = myDataEnedis.getLast7Days()
    #for day in last7days:
    #    print('day_%s' % (day["niemejour"]), day["value"] )

def test2( myDataEnedis ):
    myDataEnedis.updateContract()
    print(myDataEnedis.getContract())
    myDataEnedis.updateHCHP()
    print(myDataEnedis._heuresCreuses)
    pass

def test3( myDateEnedis):
    #retour = myDateEnedis.updateLast7DaysDetails( data )
    retour = myDateEnedis.updateLast7DaysDetails()
    retour = myDateEnedis.updateDataYesterdayHCHP()
    myDateEnedis.updateLast7Days()
    last7days = myDateEnedis.getLast7Days()
    for day in last7days:
        print('day_%s' % (day["niemejour"]), " ", day["date"], " ", day["value"] )
    last7daysHP = myDateEnedis.get7DaysHP()
    listeClef = list(last7daysHP.keys())
    listeClef.reverse()
    for clef in listeClef:
        print( clef, " ", last7daysHP[clef] )
    print(retour)

def testComplet( myDataEnedis ):
    import sensorEnedis, time, logging
    logger = logging.getLogger("testEnedis")
    mSS = sensorEnedis.manageSensorState()
    mSS.init( myDataEnedis, logger )
    mSS.updateManagerSensor()
    status_counts, state = mSS.getStatus("consommation") # selon le type du sensor cree
    if ( myDataEnedis.getStatusLastCall() == False ):
        sensorEnedis.logSensorState(status_counts)
        # on se met en attente 10 secondes, car Enedis HS
        print("**** ERROR *** ", myDataEnedis.getLastMethodCall())
        myDataEnedis.updateLastMethodCallError( myDataEnedis.getLastMethodCall()) # on met l'etat precedent
        sensorEnedis.logSensorState(status_counts)
        time.sleep( 10 )
        mSS.updateManagerSensor()
        status_counts, state = mSS.getStatus()
    sensorEnedis.logSensorState(status_counts)

    laDate = datetime.date.today() - datetime.timedelta(1)
    mSS.getStatusHistory(laDate)

def testMulti():
    import configparser
    mon_conteneur = configparser.ConfigParser()
    mon_conteneur.read("../../../myCredential/security.txt")
    #for qui in ["ENEDIS","ENEDIS2","ENEDIS3","ENEDIS4"]:
    #for qui in ["ENEDIS","ENEDIS7"]:
    #for qui in ["ENEDIS9"]:
    #for qui in ["ENEDIS","ENEDIS2","ENEDIS3","ENEDIS4","ENEDIS15"]:
    #for qui in ["ENEDIS18"]:
    #for qui in ["ENEDIS19"]:
    #for qui in ["ENEDIS"]:
    #for qui in ["ENEDIS21"]:
    for qui in ["ENEDIS21"]:
        print("*** traitement de %s " %(qui))
        token = mon_conteneur[qui]['TOKEN']
        PDL_ID = mon_conteneur[qui]['CODE']
        #print(qui , "*", token, PDL_ID)
        heureCreusesCh = eval("[['00:00','05:00'], ['22:00', '24:00']]")
        #heureCreusesCh = None
        heuresCreusesON = True
        #heuresCreusesON = False
        myDataEnedis = myEnedis.myEnedis( token=token, PDL_ID=PDL_ID, delai=10,
            heuresCreuses=heureCreusesCh, heuresCreusesCost=0.0797, heuresPleinesCost=0.1175,
            version = __version__, heuresCreusesON=heuresCreusesON )
        #myDataEnedis.updateContract()
        #myDataEnedis.updateHCHP()
        #print("myDataEnedis.getContract() : ", myDataEnedis.getContract())
        #print("myDataEnedis.getContract() : ", myDataEnedis.getContract()['usage_point_status'])
        #print("myDataEnedis.getContract() : ", myDataEnedis.getTypePDL())
        #print("myDataEnedis.getLastActivationDate() : ", myDataEnedis.getLastActivationDate())
        #print("myDataEnedis.getHeuresCreuses() : ", myDataEnedis.getHeuresCreuses())

        #myDataEnedis.updateYesterday()
        #print("cnosommation : %s" %myDataEnedis.getYesterday() )
        #myDataEnedis.updateProductionYesterday()
        #print("production : %s" %myDataEnedis.getProductionYesterday() )
        #myDataEnedis.updateLastYear()

        # myDataEnedis._serverName = "http://localhost:5500" # pour mockserver
        # myDataEnedis._serverName = "http://localhost:5501" # pour record
        #myDataEnedis.updateDataYesterdayHCHP()
        testComplet( myDataEnedis )
        #print("***")
        #print( myDataEnedis.getLastMethodCallError())
        #print( myDataEnedis.getLastAnswer())


def testMono():
    import configparser
    mon_conteneur = configparser.ConfigParser()
    mon_conteneur.read("../../../myCredential/security.txt")
    qui = "ENEDIS"
    token = mon_conteneur[qui]['TOKEN']
    PDL_ID = mon_conteneur[qui]['CODE']
    print(token, PDL_ID)

    heureCreusesCh = "[['00:00','05:00'], ['22:00', '24:00']]"
    myDataEnedis = myEnedis.myEnedis(token=token, PDL_ID=PDL_ID, delai=10, \
                                       heuresCreuses=eval(heureCreusesCh),
                                       heuresCreusesCost=0.20,
                                       heuresPleinesCost=1.30,
                                       version = __version__)
    myDataEnedis.updateContract()
    myDataEnedis.updateHCHP()
    print(myDataEnedis.getContract())
    #myDataEnedis.updateProductionYesterday()
    #retour = myDataEnedis.getProductionYesterday()
    #print("retour", retour)
    myDataEnedis.updateYesterday()
    retour = myDataEnedis.getYesterday()
    print("retour", retour)

def main():
    testMulti()
    #testMono()

if __name__ == '__main__':
    main()

""" get all update and charge l'instance et utilisation avec get after ....."""