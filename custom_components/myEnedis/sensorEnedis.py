from collections import defaultdict
import datetime
import sys, traceback

try:
    from .const import (
        _consommation,
        _production
    )

except ImportError:
    from const import (
        _consommation,
        _production
    )


class manageSensorState:
    def __init__(self ):
        self._init = False
        pass
    def getInit(self):
        return self._init
    def setInit(self, val):
        self._init = val
    def init( self, _myDataEnedis,_LOGGER = None, version = None ):
        # enedis à initialiser ici!!!
        self._myDataEnedis = _myDataEnedis
        self._LOGGER =  _LOGGER
        self.version = version
        self.setInit(True)
        pass

    def initUpdate(self):
        if (self._myDataEnedis.getContract() == None):
            self._LOGGER.info("contract ? %s" %self._myDataEnedis.get_PDL_ID())
            try:
                self._myDataEnedis.updateContract()
                self._myDataEnedis.updateHCHP()
            except Exception as inst:
                self._LOGGER.warning("myEnedis err %s" % (inst))

    def updateManagerSensor(self):
        self.initUpdate()
        self._myDataEnedis.update()
        self._LOGGER.info("updateManagerSensor - done - %s" %self._myDataEnedis.get_PDL_ID())
        pass

    def getStatusYesterdayCost(self):
        state = "unavailable"
        status_counts = defaultdict(int)
        status_counts["version"] = self.version
        dataAvailable = False
        yesterdayDate = None
        if self._myDataEnedis.getContract() != None:
            if self._myDataEnedis.getYesterday() != 0: # on a eut des données
                status_counts["yesterday_HC_cost"] = \
                    "{:.3f}".format(0.001 * self._myDataEnedis.getHCCost(self._myDataEnedis.getYesterdayHC()))
                status_counts["yesterday_HP_cost"] = \
                    "{:.3f}".format(0.001 * self._myDataEnedis.getHPCost(self._myDataEnedis.getYesterdayHP()))
                daily_cost = "{:.2f}".format(
                    0.001 * self._myDataEnedis.getHCCost(self._myDataEnedis.getYesterdayHC()) + \
                    0.001 * self._myDataEnedis.getHPCost(self._myDataEnedis.getYesterdayHP())
                )
                yesterdayDate = self._myDataEnedis.getYesterdayDate()
                status_counts["daily_cost"] = daily_cost
                state = daily_cost
                dataAvailable = True
        return dataAvailable, yesterdayDate, status_counts, state

    def getStatusHistory(self, laDate, detail = "ALL", typeSensor = _consommation):
        state = "unavailable"
        status_counts = defaultdict(int)
        status_counts["version"] = self.version
        clefDate = laDate.strftime("%Y-%m-%d %H" )
        status_counts["DateHeure"] = clefDate
        status_counts["detail"] = detail
        if self._myDataEnedis.getContract() != None:
            if self._myDataEnedis.isConsommation():
                state = 0
                if ( detail == "ALL"):
                    DateHeureDetail = self._myDataEnedis.getDateHeureDetail()
                if ( detail == "HP"):
                    DateHeureDetail = self._myDataEnedis.getDateHeureDetailHP()
                if ( detail == "HC"):
                    DateHeureDetail = self._myDataEnedis.getDateHeureDetailHC()
                if ( clefDate in DateHeureDetail.keys()):
                    state = DateHeureDetail[clefDate] * 0.001
        return status_counts, state

    def getStatus(self, typeSensor = _consommation):
        state = "unavailable"
        status_counts = defaultdict(int)
        status_counts["version"] = self.version

        if self._myDataEnedis.getContract() != None:
            # pas necessaire en visu
            #status_counts["typeCompteurPDL"] = ','.join(self._myDataEnedis.getTypePDL())
            status_counts["typeCompteur"] = typeSensor
            status_counts["activationDate"] = self._myDataEnedis.getLastActivationDate()
            if self._myDataEnedis.isConsommation():
                status_counts["lastUpdate"] = self._myDataEnedis.getLastUpdate()
                status_counts["timeLastCall"] = self._myDataEnedis.getTimeLastCall()
                # à supprimer car doublon avec j_1
                status_counts['yesterday'] = self._myDataEnedis.getYesterday()
                status_counts['last_week'] = self._myDataEnedis.getLastWeek()

            if (1):#self._myDataEnedis.getStatusLastCall():  # update avec statut ok
                try:
                    # typesensor ... fonction de  ?
                    if typeSensor == _consommation: #self._myDataEnedis.isConsommation():
                        status_counts["lastUpdate"] = self._myDataEnedis.getLastUpdate()
                        status_counts["timeLastCall"] = self._myDataEnedis.getTimeLastCall()
                        # à supprimer car doublon avec j_1
                        status_counts['yesterday'] = self._myDataEnedis.getYesterday()
                        status_counts['last_week'] = self._myDataEnedis.getLastWeek()
                        last7daysHP = self._myDataEnedis.get7DaysHP()
                        listeClef = list(last7daysHP.keys())
                        listeClef.reverse()

                        today = datetime.date.today()
                        listeClef = []
                        for i in range(7):
                            maDate = today - datetime.timedelta(i + 1)
                            listeClef.append(maDate.strftime("%Y-%m-%d"))
                        niemejour = 0
                        for clef in listeClef:
                            niemejour += 1
                            valeur = -1
                            if clef in last7daysHP.keys():
                                valeur = last7daysHP[clef]
                            status_counts['day_%s_HP' % (niemejour)] = valeur
                        last7daysHC = self._myDataEnedis.get7DaysHC()
                        niemejour = 0
                        for clef in listeClef:
                            niemejour += 1
                            valeur = -1
                            if (clef in last7daysHC.keys()):
                                valeur = last7daysHC[clef]
                            status_counts['day_%s_HC' % (niemejour)] = valeur
                        # gestion du cout par jour ....

                        niemejour = 0
                        cout = []
                        for clef in listeClef:
                            niemejour += 1
                            valeur = -1
                            if (clef in last7daysHC.keys() and clef in last7daysHP.keys()):
                                valeur = 0.001 * self._myDataEnedis.getHCCost(last7daysHC[clef]) + \
                                         0.001 * self._myDataEnedis.getHPCost(last7daysHP[clef])
                                valeur = "{:.2f}".format(valeur)
                            cout.append(valeur)
                        status_counts['dailyweek_cost'] = cout
                        niemejour = 0
                        coutHC = []
                        for clef in listeClef:
                            niemejour += 1
                            valeur = -1
                            if (clef in last7daysHC.keys()):
                                valeur = 0.001 * self._myDataEnedis.getHCCost(last7daysHC[clef])
                                valeur = "{:.2f}".format(valeur)
                            coutHC.append(valeur)
                        status_counts['dailyweek_costHC'] = coutHC

                        niemejour = 0
                        dailyHC = []
                        for clef in listeClef:
                            niemejour += 1
                            valeur = -1
                            if (clef in last7daysHC.keys()):
                                valeur = "{:.3f}".format(0.001 * last7daysHC[clef])
                            dailyHC.append(valeur)
                        status_counts['dailyweek_HC'] = dailyHC

                        status_counts['dailyweek'] = [(day) for day in listeClef]
                        niemejour = 0
                        coutHP = []
                        for clef in listeClef:
                            niemejour += 1
                            valeur = -1
                            if clef in last7daysHP.keys():
                                valeur = 0.001 * self._myDataEnedis.getHPCost(last7daysHP[clef])
                                valeur = "{:.2f}".format(valeur)
                            coutHP.append(valeur)
                        status_counts['dailyweek_costHP'] = coutHP
                        # gestion du format : "{:.2f}".format(a)

                        niemejour = 0
                        dailyHP = []
                        for clef in listeClef:
                            niemejour += 1
                            valeur = -1
                            if (clef in last7daysHP.keys()):
                                valeur = last7daysHP[clef]
                                valeur = "{:.3f}".format(0.001 * valeur)
                            dailyHP.append(valeur)
                        status_counts['dailyweek_HP'] = dailyHP

                        niemejour = 0
                        daily = []
                        for clef in listeClef:
                            niemejour += 1
                            somme = -1
                            if (clef in last7daysHP.keys() and clef in last7daysHC.keys()):
                                somme = last7daysHP[clef] + last7daysHC[clef]
                                somme = "{:.2f}".format(0.001 * somme)
                            status_counts['day_%s' % (niemejour)] = somme
                            daily.append(somme)
                        status_counts['daily'] = daily

                        status_counts["halfhourly"] = []
                        status_counts["offpeak_hours"] = "{:.3f}".format(self._myDataEnedis.getYesterdayHC() * 0.001)
                        status_counts["peak_hours"] = "{:.3f}".format(self._myDataEnedis.getYesterdayHP() * 0.001)
                        if (self._myDataEnedis.getYesterdayHC() + self._myDataEnedis.getYesterdayHP()) != 0:
                            valeur = (self._myDataEnedis.getYesterdayHP() * 100) / \
                                     (self._myDataEnedis.getYesterdayHC() + self._myDataEnedis.getYesterdayHP())
                            status_counts["peak_offpeak_percent"] = "{:.2f}".format(valeur)
                        else:
                            status_counts["peak_offpeak_percent"] = 0
                        status_counts["yesterday_HC_cost"] = \
                            "{:.3f}".format(0.001 * self._myDataEnedis.getHCCost(self._myDataEnedis.getYesterdayHC()))
                        status_counts["yesterday_HP_cost"] = \
                            "{:.3f}".format(0.001 * self._myDataEnedis.getHPCost(self._myDataEnedis.getYesterdayHP()))
                        status_counts["daily_cost"] = "{:.2f}".format(
                            0.001 * self._myDataEnedis.getHCCost(self._myDataEnedis.getYesterdayHC()) + \
                            0.001 * self._myDataEnedis.getHPCost(self._myDataEnedis.getYesterdayHP())
                        )
                        status_counts["yesterday_HC"] = "{:.3f}".format(self._myDataEnedis.getYesterdayHC() * 0.001)
                        status_counts["yesterday_HP"] = "{:.3f}".format(self._myDataEnedis.getYesterdayHP() * 0.001)
                        status_counts['current_week'] = "{:.3f}".format(self._myDataEnedis.getCurrentWeek() * 0.001)
                        status_counts['last_month'] = "{:.3f}".format(self._myDataEnedis.getLastMonth() * 0.001)
                        status_counts['current_month'] = "{:.3f}".format(self._myDataEnedis.getCurrentMonth() * 0.001)
                        status_counts['last_year'] = "{:.3f}".format(self._myDataEnedis.getLastYear() * 0.001)
                        status_counts['current_year'] = "{:.3f}".format(self._myDataEnedis.getCurrentYear() * 0.001)
                        status_counts['errorLastCall'] = self._myDataEnedis.getErrorLastCall()
                        if ((self._myDataEnedis.getLastMonthLastYear() is not None) and
                                (self._myDataEnedis.getLastMonthLastYear() != 0) and
                                (self._myDataEnedis.getLastMonth() is not None)):
                            valeur = \
                                ((self._myDataEnedis.getLastMonth() - self._myDataEnedis.getLastMonthLastYear())
                                 / self._myDataEnedis.getLastMonthLastYear()) * 100
                            status_counts["monthly_evolution"] = "{:.3f}".format(valeur)
                        else:
                            status_counts["monthly_evolution"] = 0
                        status_counts["subscribed_power"] = self._myDataEnedis.getsubscribed_power()
                        status_counts["offpeak_hours_enedis"] = self._myDataEnedis.getoffpeak_hours()
                        status_counts["offpeak_hours"] = self._myDataEnedis.getHeuresCreuses()
                        # status_counts['yesterday'] = ""
                    if typeSensor == _production: #self._myDataEnedis.isProduction():
                        status_counts["yesterday_production"] = self._myDataEnedis.getProductionYesterday()
                        status_counts['errorLastCall'] = self._myDataEnedis.getErrorLastCall()
                        status_counts["lastUpdate"] = self._myDataEnedis.getLastUpdate()
                        status_counts["timeLastCall"] = self._myDataEnedis.getTimeLastCall()

                    if typeSensor == _consommation: #self._myDataEnedis.isConsommation():
                        valeurstate = status_counts['yesterday'] * 0.001
                    else:
                        valeurstate = status_counts['yesterday_production'] * 0.001
                    state = "{:.3f}".format(valeurstate)

                except Exception:
                    status_counts['errorLastCall'] = self._myDataEnedis.getErrorLastCall()
                    self._LOGGER.warning("-" * 60)
                    exc_type, exc_value, exc_traceback = sys.exc_info()
                    self._LOGGER.warning(sys.exc_info())
                    msg = repr(traceback.format_exception(exc_type, exc_value,
                                                          exc_traceback))

                    self._LOGGER.warning(msg)
                    self._LOGGER.warning("errorLastCall : %s " % (self._myDataEnedis.getErrorLastCall()))
            else:
                status_counts['errorLastCall'] = self._myDataEnedis.getErrorLastCall()
        else:
            status_counts['errorLastCall'] = self._myDataEnedis.getErrorLastCall()

        return status_counts, state

def logSensorState( status_counts ):
    for x in status_counts.keys():
        print(" %s : %s" %( x, status_counts[x]))