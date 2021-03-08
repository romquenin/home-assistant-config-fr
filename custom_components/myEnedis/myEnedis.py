import requests
import datetime, time, sys
import json
import logging

try:
    from .const import (
        _consommation,
        _production
    )
    from . import messages

except ImportError:
    import messages
    from const import (
        _consommation,
        _production
    )

__nameMyEnedis__ = "myEnedis"

class myEnedis:
    def __init__(self, token, PDL_ID, delai=3600, heuresCreuses=None, \
                 heuresCreusesCost=0, heuresPleinesCost=0, log=None, version="0.0.0",
                 heuresCreusesON=True):
        self._serverName = "https://enedisgateway.tech/api"
        self._token = token
        self._PDL_ID = PDL_ID
        self._lastMonth = 0
        self._lastYear = 0
        self._currentMonth = 0
        self._currentYear = 0
        self._lastWeek = 0
        self._last7Days = []
        self._lastMonthLastYear = 0
        self._currentWeek = 0
        self._yesterday = 0
        self._productionYesterday = 0
        self._lastUpdate = None
        self._timeLastUpdate = None
        self._statusLastCall = True
        self._errorLastCall = None
        self._lastAnswer = None
        self._errorLastMethodCall = None
        self._errorLastMethodCallError = None
        self._delai = delai
        self._heuresCreuses = heuresCreuses
        self._heuresCreusesCost = heuresCreusesCost
        self._heuresPleinesCost = heuresPleinesCost
        self._contract = None
        self._HC, self._HP = 0, 0
        self._interval_length = 1
        self._updateRealise = False
        self._niemeAppel = 0
        self._yesterdayDate = None
        self._version = version
        self._dateHeureDetail = {}
        self._dateHeureDetailHC = {}
        self._dateHeureDetailHP = {}

        self._heuresCreusesON = heuresCreusesON
        self._joursHC = {}
        self._joursHP = {}
        self._log = logging.getLogger(__nameMyEnedis__)

        self._contentType = "application/json"
        self._contentHeaderMyEnedis = 'home-assistant-myEnedis'
        self._formatDateYmd = "%Y-%m-%d"
        self._formatDateYm01 = "%Y-%m-01"
        self._formatDateY0101 = "%Y-01-01"
        self._log.info("run myEnedis")
        self._function = {}
        pass

    def setfunction(self, name, val = False):
        self._function[name] = val

    def myLog(self, message):
        # self._log.info(message)
        # self._log.warning(message)
        pass

    def myLogWarning(self, message):
        self._log.warning(message)

    def setUpdateRealise(self, value):
        self._updateRealise = value

    def getUpdateRealise(self):
        return self._updateRealise

    def get_PDL_ID(self):
        return self._PDL_ID

    def post_and_get_json(self, url, params=None, data=None, headers=None):
        try:
            import json
            session = requests.Session()
            #self.myLogWarning("params : %s " % (params))
            #self.myLogWarning("data : %s " % (json.dumps(data)))
            response = session.post(url, params=params, data=json.dumps(data), headers=headers, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.Timeout as error:
            response = {"enedis_return": {"error": "UNKERROR_002"}}
            return response
        except requests.exceptions.HTTPError as error:
            if ( "ADAM-ERR0069" not in response.text ) and \
                ( "token_refresh_401" not in response.text ):
                self.myLogWarning("*" * 60)
                self.myLogWarning("header : %s " % (headers))
                self.myLogWarning("data : %s " % (json.dumps(data)))
                self.myLogWarning("Error JSON : %s " % (response.text))
            return response.json()

    def setLastAnswsr(self, lastanswer):
        self._lastAnswer = lastanswer

    def getLastAnswer(self):
        return self._lastAnswer

    def minCompareDateContract(self, datePeriod):
        minDate = self.getLastActivationDate()
        if ( minDate is not None ) and ( minDate > "%s"%datePeriod ):
            return minDate
        else:
            return datePeriod
    def maxCompareDateContract(self, datePeriod):
        dateContract = self.getLastActivationDate()
        if ( dateContract is not None ) and ( dateContract < "%s"%datePeriod ):
            return datePeriod
        else:
            return None

    def getDataPeriod(self, deb, fin):
        #self.myLogWarning("-(-get dataPeriod : %s => %s --" % (deb, fin))
        deb = self.minCompareDateContract( deb )
        fin = self.maxCompareDateContract( fin )
        #self.myLogWarning("-c-get dataPeriod : %s => %s --" % (deb, fin))
        #self.myLogWarning("--------------------------")
        if ( fin is not None ):
            self.myLog("--get dataPeriod : %s => %s --" % (deb, fin))
            payload = {
                'type': 'daily_consumption',
                'usage_point_id': self._PDL_ID,
                'start': '%s' % (deb),
                'end': '%s' % (fin),
            }
            headers = {
                'Authorization': self._token,
                'Content-Type': self._contentType,
                'call-service': self._contentHeaderMyEnedis,
                'ha_sensor_myenedis_version':self._version,
            }
            dataAnswer = self.post_and_get_json(self._serverName, data=payload, headers=headers)
            callDone = True
        else:
            # pas de donnée
            callDone = False
            dataAnswer = ""
        self.setLastAnswsr(dataAnswer)
        return dataAnswer, callDone

    def getDataProductionPeriod(self, deb, fin):
        self.myLog("--get ProductionPeriod : %s => %s --" % (deb, fin))
        payload = {
            'type': 'daily_production',
            'usage_point_id': self._PDL_ID,
            'start': '%s' % (deb),
            'end': '%s' % (fin),
        }
        headers = {
            'Authorization': self._token,
            'Content-Type': self._contentType,
            'call-service': self._contentHeaderMyEnedis,
            'ha_sensor_myenedis_version':self._version,
        }
        dataAnswer = self.post_and_get_json(self._serverName, data=payload, headers=headers)
        self.setLastAnswsr(dataAnswer)
        return dataAnswer

    def getDataPeriodCLC(self, deb, fin):
        payload = {
            'type': 'consumption_load_curve',
            'usage_point_id': self._PDL_ID,
            'start': '%s' % (deb),
            'end': '%s' % (fin),
        }
        headers = {
            'Authorization': self._token,
            'Content-Type': self._contentType,
            'call-service': self._contentHeaderMyEnedis,
            'ha_sensor_myenedis_version':self._version,
        }
        dataAnswer = self.post_and_get_json(self._serverName, data=payload, headers=headers)
        self.setLastAnswsr(dataAnswer)
        return dataAnswer

    def getDataContract(self, ):
        payload = {
            'type': 'contracts',
            'usage_point_id': self._PDL_ID,
        }
        headers = {
            'Authorization': self._token,
            'Content-Type': self._contentType,
            'call-service': self._contentHeaderMyEnedis,
            'ha_sensor_myenedis_version':self._version,
        }
        dataAnswer = self.post_and_get_json(self._serverName, data=payload, headers=headers)
        self.setLastAnswsr(dataAnswer)
        return dataAnswer

    def CallgetDataContract(self):
        return self.getDataContract()

    def CallgetYesterday(self):
        hier = (datetime.date.today() - datetime.timedelta(1)).strftime(self._formatDateYmd)
        cejour = (datetime.date.today()).strftime(self._formatDateYmd)
        val1, val2 = self.getDataPeriod(hier, cejour)
        return val1, val2, hier

    def CallgetProductionYesterday(self):
        hier = (datetime.date.today() - datetime.timedelta(1)).strftime(self._formatDateYmd)
        cejour = (datetime.date.today()).strftime(self._formatDateYmd)
        return self.getDataProductionPeriod(hier, cejour)

    def CallgetDataYesterdayHCHP(self):
        hier = (datetime.date.today() - datetime.timedelta(1)).strftime(self._formatDateYmd)
        cejour = (datetime.date.today()).strftime(self._formatDateYmd)
        return self.getDataPeriodCLC(hier, cejour), hier

    def CallgetCurrentWeek(self):
        import datetime
        today = datetime.date.today()
        cejour = (datetime.date.today()).strftime(self._formatDateYmd)
        firstdateofweek = (
                    datetime.date.today() - datetime.timedelta(days=datetime.datetime.today().weekday() % 7)).strftime(
            self._formatDateYmd)
        if (cejour == firstdateofweek):
            return 0, False  # cas lundi = premier jour de la semaine et donc rien de dispo
        else:
            return self.getDataPeriod(firstdateofweek, cejour)

    def CallgetLast7Days(self):
        import datetime
        today = datetime.date.today()
        start_date = today - datetime.timedelta(7)
        end_date = (datetime.date.today()).strftime(self._formatDateYmd)
        return self.getDataPeriod(start_date, end_date)

    def CallgetLast7DaysDetails(self):
        import datetime
        today = datetime.date.today()
        start_date = today - datetime.timedelta(7)
        end_date = (datetime.date.today()).strftime(self._formatDateYmd)
        return self.getDataPeriodCLC(start_date, end_date)

    def CallgetCurrentMonthDetails(self):
        import datetime
        today = datetime.date.today()
        debCurrentMonth = today.strftime(self._formatDateYm01)
        cejour = (datetime.date.today()).strftime(self._formatDateYmd)
        if (debCurrentMonth != cejour):
            return self.getDataPeriodCLC(debCurrentMonth, cejour)
        else:
            return 0

    def CallgetLastWeek(self):
        import datetime
        today = datetime.date.today()
        start_date = today + datetime.timedelta(-today.weekday(), weeks=-1)
        end_date = today + datetime.timedelta(-today.weekday())
        return self.getDataPeriod(start_date, end_date)

    def CallgetLastMonth(self):
        import datetime
        today = datetime.date.today()
        first = today.replace(day=1)
        lastMonth = first - datetime.timedelta(days=1)
        debPreviousMonth = lastMonth.strftime(self._formatDateYm01)
        debCurrentMonth = first.strftime(self._formatDateYm01)
        return self.getDataPeriod(debPreviousMonth, debCurrentMonth)

    def CallgetLastMonthLastYear(self):
        import datetime
        today = datetime.date.today()
        first = today.replace(day=1, year=today.year - 1)
        lastMonthLastYear = first - datetime.timedelta(days=1)
        debPreviousMonth = lastMonthLastYear.strftime(self._formatDateYm01)
        debCurrentMonth = first.strftime(self._formatDateYm01)
        return self.getDataPeriod(debPreviousMonth, debCurrentMonth)

    def CallgetLastYear(self):
        import datetime
        today = datetime.date.today()
        first = today.replace(day=1, month=1)
        lastYear = first - datetime.timedelta(days=1)
        debPreviousYear = lastYear.strftime(self._formatDateY0101)
        debCurrentYear = today.strftime(self._formatDateY0101)
        return self.getDataPeriod(debPreviousYear, debCurrentYear)

    def CallgetCurrentMonth(self):
        import datetime
        today = datetime.date.today()
        debCurrentMonth = today.strftime(self._formatDateYm01)
        cejour = (datetime.date.today()).strftime(self._formatDateYmd)
        if (debCurrentMonth != cejour):
            return self.getDataPeriod(debCurrentMonth, cejour)
        else:
            return 0, False

    def CallgetCurrentYear(self):
        import datetime
        today = datetime.date.today()
        debCurrentMonth = today.strftime(self._formatDateY0101)
        cejour = (datetime.date.today()).strftime(self._formatDateYmd)
        if (debCurrentMonth != cejour):
            return self.getDataPeriod(debCurrentMonth, cejour)
        else:
            return 0, False

    def analyseValueAndAdd(self, data):
        #print(data)
        if (data == None):  # pas de valeur
            raise Exception('call', None)
        else:
            tot = 0
            for x in data["meter_reading"]["interval_reading"]:
                tot += int(x["value"])
            return tot

    def analyseValueAndMadeDico(self, data):
        dicoLast7days = []
        if (data == None):  # pas de valeur
            raise Exception('call', None)
        else:
            niemejour = 0
            for x in reversed(data["meter_reading"]["interval_reading"]):
                niemejour += 1
                days = {}
                days['date'] = x['date']
                days['niemejour'] = niemejour
                days['value'] = int(x['value'])
                dicoLast7days.append(days)
        return dicoLast7days

    def analyseValue(self, data):
        if (data == None):  # pas de valeur
            return None
        else:
            return int(data["meter_reading"]["interval_reading"][0]["value"])

    def getContractData(self, contract, clef, defaultValue):
        if clef in contract:
            return contract[ clef ]
        else:
            return defaultValue

    def analyseValueContract(self, data):
        contract = None
        if data != None:  # si une valeur
            for x in data['customer']['usage_points']:
                if str(x["usage_point"]['usage_point_id']) == self._PDL_ID:
                    contract = {}
                    contract['contracts'] = x["contracts"]
                    contract['usage_point_status'] = x["usage_point"]["usage_point_status"]
                    contract['subscribed_power'] = self.getContractData(x["contracts"], "subscribed_power", "???")
                    contract["mode_PDL"] = [ _consommation, _production ]
                    #if "subscribed_power" in x["contracts"]:
                    #    contract["mode_PDL"].append(_consommation)
                    #    if( contract['usage_point_status'] == "no com" ):
                    #        contract["mode_PDL"].append(_production)
                    #else:
                    #    contract["mode_PDL"].append(_production)
                    contract['offpeak_hours'] = self.getContractData(x["contracts"], "offpeak_hours", [])
                    contract['last_activation_date'] = self.getContractData(x["contracts"], "last_activation_date", None)[:10]
        return contract

    def getContract(self):
        return self._contract

    def getsubscribed_power(self):
        return self._contract['subscribed_power']

    def getoffpeak_hours(self):
        return self._contract['offpeak_hours']

    def getLastActivationDate(self):
        return self._contract['last_activation_date']

    def getHeuresCreuses(self):
        return self._heuresCreuses

    def getTypePDL(self):
        return self._contract["mode_PDL"]

    def isConsommation(self):
        return True #_consommation in self._contract["mode_PDL"]

    def isProduction(self):
        return True #_production in self._contract["mode_PDL"]

    def getcleanoffpeak_hours(self, offpeak=None):
        if (offpeak == None): offpeak = self._contract['offpeak_hours']
        if (offpeak != None) and (offpeak != []):
            offpeakClean1 = offpeak.split("(")[1].replace(")", "").replace("H", ":").replace(";", "-").split("-")
            opcnew = []
            deb = ""
            fin = ""
            lastopc = ""
            for opc in offpeakClean1:
                opc = opc.rjust(5).replace(" ", "0")
                if (lastopc != ""):
                    fin = opc
                    if (lastopc > opc):
                        fin = "23:59"
                        opcnew.append([deb, fin])
                        deb = "00:00"
                        fin = opc
                    opcnew.append([deb, fin])
                    deb = opc
                else:
                    deb = opc
                lastopc = opc
        else:
            opcnew = []
        return opcnew

    def updateContract(self, data=None):
        try:
            self.updateLastMethodCall("updateContract")
            self.myLog("--updateContract --")
            if (data == None): data = self.CallgetDataContract()
            self.myLog("updateContract : data %s" % (data))
            self.checkDataContract(data)
            self.myLog("updateContract(2) : data %s" % (data))
            self._contract = self.analyseValueContract(data)
        except Exception as inst:
            if (inst.args[:2] == ("call", "error")):
                message = "%s - %s" % (messages.getMessage(inst.args[2]), self.getLastAnswer())
                self.updateErrorLastCall(message)
                raise Exception(inst)
            else:
                raise Exception(inst)

    def updateHCHP(self, heuresCreuses=None):
        if ( self._heuresCreusesON ):
            opcnew = self.getcleanoffpeak_hours()
            if (heuresCreuses != None):
                self._heuresCreuses = heuresCreuses
            elif (self._heuresCreuses != None) and ( self._heuresCreuses != []):
                # on garde les heures creueses déja définie....
                # self._heuresCreuses = .....
                pass
            elif (opcnew != []):
                self._heuresCreuses = opcnew
            else:
                pass
        else:
            #pas d'heures creuses
            self._heuresCreuses = []

    def getYesterday(self):
        return self._yesterday

    def getYesterdayDate(self):
        return self._yesterdayDate

    def updateYesterday(self, data=None):
        self.setfunction('yesterday')
        self.updateLastMethodCall("updateYesterday")
        self.myLog("--updateYesterday --")
        yesterdayDate = None
        if (data == None): data, callDone, yesterdayDate = self.CallgetYesterday()
        else: callDone = True
        self.myLog("updateYesterday : data %s" % (data))
        if (callDone ) and (self.checkData(data)):
            self._yesterday = self.analyseValue(data)
            self._yesterdayDate = yesterdayDate
            self.setfunction('yesterday', True)
        else:
            self._yesterday = 0

    def getProductionYesterday(self):
        return self._productionYesterday

    def updateProductionYesterday(self, data=None):
        self.setfunction('productionYesterday' )
        self.updateLastMethodCall("updateProductionYesterday")
        self.myLog("--updateProductionYesterday --")
        if (data == None): data = self.CallgetProductionYesterday()
        else: callDone = True
        self.myLog("updateProductionYesterday : data %s" % (data))
        if (self.checkData(data)):
            self._productionYesterday = self.analyseValue(data)
            self.setfunction('productionYesterday', True )
        else:
            self._productionYesterday = 0

    def getYesterdayHP(self):
        return self._HP

    def getYesterdayHC(self):
        return self._HC

    def get7DaysHP(self):
        return self._joursHP

    def get7DaysHC(self):
        return self._joursHC

    def getDateHeureDetail(self):
        return self._dateHeureDetail

    def getDateHeureDetailHC(self):
        return self._dateHeureDetailHC

    def getDateHeureDetailHP(self):
        return self._dateHeureDetailHP

    def getHCCost(self, val):
        return val * self._heuresCreusesCost  # car à l'heure et non à la demi-heure

    def getHPCost(self, val):
        return val * self._heuresPleinesCost  # car à l'heure et non à la demi-heure

    def _getHCHPfromHour(self, heure):
        heurePleine = True
        if ( self._heuresCreuses is not None ):
            for heureCreuse in self._heuresCreuses:
                try:  # gestion du 00:00 en heure de fin de creneau
                    if (heure == {"24:00": "00:00"}[heureCreuse[1]]):
                        heurePleine = False
                except:
                    pass
                if (heureCreuse[0] < heure) and (heure <= heureCreuse[1]):
                    heurePleine = False
        return heurePleine

    def createMultiDaysHCHP(self, data):
        joursHC = {}
        joursHP = {}
        dateDuJour = (datetime.date.today()).strftime(self._formatDateYmd)
        for x in data["meter_reading"]["interval_reading"]:
            self._interval_length = x["interval_length"]
            date = x["date"][:10]
            heure = x["date"][11:16]
            if (heure == "00:00"):  # alors sur la veille, var c'est la fin de la tranche du jour precedent
                date = (datetime.datetime.strptime(date, '%Y-%m-%d') - datetime.timedelta(1)).strftime(
                    self._formatDateYmd)

            # if ( date == dateDuJour ):
            #    print("ici", x["date"], x["value"])
            #    pass
            # else:
            if (1):
                if date not in joursHC: joursHC[date] = 0
                if date not in joursHP: joursHP[date] = 0
                heurePleine = self._getHCHPfromHour(heure)
                clef = x["date"][:13]
                if (clef not in self._dateHeureDetail.keys()):
                    self._dateHeureDetail[clef] = 0
                self._dateHeureDetail[clef] += int(x["value"]) * self.getCoeffIntervalLength()
                if (heurePleine):
                    joursHP[date] += int(x["value"]) * self.getCoeffIntervalLength()  # car c'est en heure
                    if (clef not in self._dateHeureDetailHP.keys()):
                        self._dateHeureDetailHP[clef] = 0
                    self._dateHeureDetailHP[clef] += int(x["value"]) * self.getCoeffIntervalLength()
                else:
                    joursHC[date] += int(x["value"]) * self.getCoeffIntervalLength()  # car c'est pas en heure
                    if (clef not in self._dateHeureDetailHC.keys()):
                        self._dateHeureDetailHC[clef] = 0
                    self._dateHeureDetailHC[clef] += int(x["value"]) * self.getCoeffIntervalLength()

        return joursHC, joursHP

    def getIntervalLength(self):
        return self._interval_length

    def getCoeffIntervalLength(self):
        interval = self.getIntervalLength()
        coeff = 1
        if (interval == "PT10M"): coeff = 1 * 10 / 60
        if (interval == "PT20M"): coeff = 1 * 20 / 60
        if (interval == "PT30M"): coeff = 1 * 30 / 60
        if (interval == "PT60M"): coeff = 1
        return coeff

    def createHCHP(self, data):
        #print("ici**********")
        self._HP = 0
        self._HC = 0
        for x in data["meter_reading"]["interval_reading"]:
            self._interval_length = x["interval_length"]
            heure = x["date"][11:16]
            heurePleine = self._getHCHPfromHour(heure)
            if (heurePleine):
                self._HP += int(x["value"]) * self.getCoeffIntervalLength()  # car par transhce de 30 minutes
            else:
                self._HC += int(x["value"]) * self.getCoeffIntervalLength()  # car par transhce de 30 minutes

    def updateDataYesterdayHCHP(self, data=None, _yesterdayDate=None):
        self.setfunction('yesterdayHCHP')
        self.updateLastMethodCall("updateDataYesterdayHCHP")
        self.myLog("--updateDataYesterdayHCHP --")
        if (_yesterdayDate != None): yesterdayDate = _yesterdayDate
        if (data == None): data, yesterdayDate = self.CallgetDataYesterdayHCHP()
        self.myLog("updateDataYesterdayHCHP : data %s" % (data))
        if (self.checkData(data)):
            self.createHCHP(data)
            self._yesterdayHCHPDate = yesterdayDate
            self.setfunction('yesterdayHCHP', True )
        else:
            return

    def checkDataPeriod(self, dataAnswer):
        if ("enedis_return" in dataAnswer.keys() and "error" in dataAnswer.keys()):
            #erreur 500
            if ( dataAnswer["error"] == "result_500"):
                return
        if ("enedis_return" in dataAnswer.keys()):
            if ("error" in dataAnswer['enedis_return']):
                if (dataAnswer['enedis_return']["error"] == "ADAM-ERR0123") or \
                        (dataAnswer['enedis_return']["error"] == "no_data_found") or \
                        (dataAnswer['enedis_return']["error"] == "ADAM-ERR0069") or \
                        (dataAnswer['enedis_return']["error"] == "UNKERROR_002"):
                    return False
                if (dataAnswer['enedis_return']["error"] == "Internal Server error"):
                    # erreur interne enedis
                    raise Exception('call', "error", "UNKERROR_001")
                else:
                    raise Exception('call', "error", dataAnswer['enedis_return']["error"])
            else:
                raise Exception('call', "error", "UNKERROR_001")
        if ("error" in dataAnswer.keys()):
            if (dataAnswer["error"] == "client_not_found"):
                # client inconnu
                raise Exception('call', "error", "UNKERROR_003")
            else:
                raise Exception('call', "error", dataAnswer["error"])
        return True

    def checkData(self, dataAnswer):
        if ("enedis_return" in dataAnswer.keys() and "error" in dataAnswer.keys()):
            #erreur 500
            if ( dataAnswer["error"] == "result_500"):
                return
        if ("enedis_return" in dataAnswer.keys()):
            if ("error" in dataAnswer['enedis_return']):
                # No consent can be found for this customer and this usage point
                if (dataAnswer['enedis_return']["error"] == "ADAM-DC-0008") or \
                        (dataAnswer['enedis_return']["error"] == "ADAM-ERR0069") or \
                        (dataAnswer['enedis_return']["error"] == "UNKERROR_002"):
                    return False
                if (dataAnswer['enedis_return']["error"] == "Internal Server error"):
                    # erreur interne enedis
                    raise Exception('call', "error", "UNKERROR_001")
                else:
                    raise Exception('call', "error", dataAnswer["error"])
            else:
                raise Exception('call', "error", "UNKERROR_001")
        if ("error" in dataAnswer.keys()):
            if (dataAnswer["error"] == "client_not_found"):
                # client inconnu
                raise Exception('call', "error", "UNKERROR_003")
            else:
                raise Exception('call', "error", dataAnswer["error"])
        return True

    def checkDataContract(self, dataAnswer):
        if ("error" in dataAnswer.keys()):
            raise Exception('call', "error", dataAnswer["error"])
        return True

    def getLastMonth(self):
        return self._lastMonth

    def updateLastMonth(self, data=None):
        self.setfunction('lastMonth')
        self.updateLastMethodCall("updateLastMonth")
        self.myLog("--updateLastMonth --")
        if (data == None): data, callDone = self.CallgetLastMonth()
        else: callDone = True
        self.myLog("updateLastMonth : data %s" % (data))
        if (callDone ) and (self.checkDataPeriod(data)):
            self._lastMonth = self.analyseValueAndAdd(data)
            self.setfunction('lastMonth', True )
        else:
            self._lastMonth = 0

    def getLastMonthLastYear(self):
        return self._lastMonthLastYear

    def updateLastMonthLastYear(self, data=None, callDone=None):
        self.setfunction('lastMonthLastYear')
        self.updateLastMethodCall("updateLastMonthLastYear")
        self.myLog("--updateLastMonthLastYear --")
        if (data == None): data, callDone = self.CallgetLastMonthLastYear()
        else: callDone = True
        self.myLog("updateLastMonthLastYear : data %s" % (data))
        if (callDone) and (self.checkDataPeriod(data)):
            self._lastMonthLastYear = self.analyseValueAndAdd(data)
            self.setfunction('lastMonthLastYear', True )
        else:
            self._lastMonthLastYear = 0

    def getLastWeek(self):
        return self._lastWeek

    def updateLastWeek(self, data=None):
        self.setfunction('lastweek' )
        self.updateLastMethodCall("updateLastWeek")
        self.myLog("--updateLastWeek --")
        if (data == None): data, callDone = self.CallgetLastWeek()
        else: callDone = True
        self.myLog("updateLastWeek : data %s" % (data))
        if (callDone) and ( self.checkDataPeriod(data)):
            self._lastWeek = self.analyseValueAndAdd(data)
            self.setfunction('lastWeek', True )
        else:
            self._lastWeek = 0

    def getLast7Days(self):
        return self._last7Days

    def updateLast7Days(self, data=None):
        self.setfunction('last7Days')
        self.updateLastMethodCall("updateLast7Days")
        self.myLog("--updateLast7Days --")
        if (data == None): data, callDone = self.CallgetLast7Days()
        else: callDone = True
        self.myLog("updateLast7Days : data %s" % (data))
        if (callDone) and (self.checkDataPeriod(data)):
            # construction d'un dico utile ;)
            self._last7Days = self.analyseValueAndMadeDico(data)
            self.setfunction('last7Days', True )
        else:
            return

    def getLast7DaysDetails(self):
        return self._last7DaysDetails

    def updateLast7DaysDetails(self, data=None):
        self.setfunction('last7DaysDetails' )
        self.updateLastMethodCall("updateLast7DaysDetails")
        self.myLog("--updateLast7DaysDetails --")
        if (data == None): data = self.CallgetLast7DaysDetails()
        self.myLog("updateLast7DaysDetails : data %s" % (data))
        if (self.checkDataPeriod(data)):
            # construction d'un dico utile ;)
            self._joursHC, self._joursHP = self.createMultiDaysHCHP(data)
            self.setfunction('last7DaysDetails', True )
        else:
            return

    def getCurrentWeek(self):
        return self._currentWeek

    def updateCurrentWeek(self, data=None):
        self.setfunction('currentWeek' )
        self.updateLastMethodCall("updateCurrentWeek")
        self.myLog("--updateCurrentWeek --")
        if (data == None): data, callDone = self.CallgetCurrentWeek()
        else: callDone = True
        self.myLog("updateCurrentWeek : data %s" % (data))
        if ( callDone ) and ( data != 0 ):
            if (self.checkDataPeriod(data)):
                self._currentWeek = self.analyseValueAndAdd(data)
                self.setfunction('currentWeek', True )
            else:
                self._currentWeek = 0
        else:
            self._currentWeek = data

    def getCurrentMonth(self):
        return self._currentMonth

    def updateCurrentMonth(self, data=None):
        self.setfunction('currentMonth')
        self.updateLastMethodCall("updateCurrentMonth")
        self.myLog("--updateCurrentMonth --")
        if (data == None): data, callDone = self.CallgetCurrentMonth()
        else: callDone = True
        self.myLog("updateCurrentMonth : data %s" % (data))
        if (callDone) and ( data != 0 ):
            if (self.checkDataPeriod(data)):
                self._currentMonth = self.analyseValueAndAdd(data)
                self.setfunction('currentMonth', True )
            else:
                self._currentMonth = 0
        else:
            self._currentMonth = data

    def getLastYear(self):
        return self._lastYear

    def updateLastYear(self, data=None):
        self.setfunction('lastYear')
        self.updateLastMethodCall("updateLastYear")
        self.myLog("--updateLastYear --")
        if (data == None): data, callDone = self.CallgetLastYear()
        else: callDone = True
        self.myLog("updateLastYear : data %s" % (data))
        if (callDone ) and ( self.checkDataPeriod(data)):
            self._lastYear = self.analyseValueAndAdd(data)
            self.setfunction('lastYear', True )
        else:  # pas de donnée disponible
            self._lastYear = 0

    def getCurrentYear(self):
        return self._currentYear

    def updateCurrentYear(self, data=None):
        self.setfunction('currentYear')
        self.updateLastMethodCall("updateCurrentYear")
        self.myLog("--updateCurrentYear --")
        if (data == None): data, callDone = self.CallgetCurrentYear()
        else: callDone = True
        self.myLog("updateCurrentYear : data %s" % (data))
        if (callDone ) and ( data != 0 ):
            if (self.checkDataPeriod(data)):
                self._currentYear = self.analyseValueAndAdd(data)
                self.setfunction('currentYear', True )
            else:
                self._currentYear = 0
        else:
            self._currentYear = 0

    def getLastUpdate(self):
        return self._lastUpdate

    def updateLastUpdate(self):
        self._lastUpdate = datetime.datetime.now()

    def getTimeLastCall(self):
        return self._timeLastUpdate

    def updateTimeLastCall(self):
        self._timeLastUpdate = datetime.datetime.now()

    def getStatusLastCall(self):
        return self._statusLastCall

    def updateStatusLastCall(self, status):
        self._statusLastCall = status

    def getErrorLastCall(self):
        return self._errorLastCall

    def getLastMethodCall(self):
        return self._errorLastMethodCall

    def getLastMethodCallError(self):
        return self._errorLastMethodCallError

    def updateLastMethodCall(self, methodName):
        self._errorLastMethodCall = methodName
        if (self._errorLastMethodCallError == self._errorLastMethodCall):
            self._errorLastMethodCallError = ""
            self.updateStatusLastCall(True)  # pour la prochaine reprenne normalement car tout est conforme

    def updateLastMethodCallError(self, methodName):
        self._errorLastMethodCallError = methodName

    def updateErrorLastCall(self, errorMessage):
        self._errorLastCall = errorMessage

    def getDelai(self):
        return self._delai

    def getDelaiIsGood(self):
        self.myLog("TimeLastCall : %s" % (self.getTimeLastCall()))
        ecartOk = (datetime.datetime.now() - self.getTimeLastCall()).seconds > self.getDelai()
        return ecartOk

    def update(self):
        #self.myLogWarning("myEnedis ...%s yesterday data %s %s" \
        #    %( self.getYesterdayDate(), self.getYesterdayHC(), self.getYesterdayHC()))
        if (self.getContract() != None):
            if ((self.getTimeLastCall() == None) or
                (self.getStatusLastCall() == False) or
                (self.getDelaiIsGood())):
                try:
                    self.myLogWarning("myEnedis ...%s update lancé, status precedent : %s, lastCall :%s" \
                                      % (self.get_PDL_ID(), self.getStatusLastCall(), self.getLastMethodCallError()))
                    self.updateErrorLastCall("")
                    self.updateLastMethodCall("")
                    self.setUpdateRealise(True)
                    if (self.isConsommation()):
                        self._niemeAppel += 1
                        if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateYesterday"):
                            self.updateYesterday()
                        try:
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateCurrentWeek"):
                                self.updateCurrentWeek()
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateLastWeek"):
                                self.updateLastWeek()
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateLast7Days"):
                                self.updateLast7Days()
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateDataYesterdayHCHP"):
                                try:
                                    self.updateDataYesterdayHCHP()
                                except Exception as inst:
                                    # print("inst :", inst)
                                    if (inst.args[:3] == ('call', 'error',
                                                          'no_data_found')):  # gestion que c'est pas une erreur de contrat trop recent ?
                                        # si le service ne repond pas, l'erreur pas grave, c'est que pas encore remonté
                                        message = "%s %s" % (messages.getMessage(inst.args[2]), " pour hier")
                                        self.updateErrorLastCall(message)
                                        pass
                                    else:
                                        self.myLogWarning("Err !! lastanswer %s"%self.getLastAnswer())
                                        self.myLogWarning("Err !! self._heuresCreuses %s"%self._heuresCreuses)
                                        raise Exception(inst)
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateLast7DaysDetails"):
                                self.updateLast7DaysDetails()
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateCurrentMonth"):
                                self.updateCurrentMonth()
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateLastMonth"):
                                self.updateLastMonth()
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateCurrentYear"):
                                self.updateCurrentYear()
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateLastYear"):
                                self.updateLastYear()
                            if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateLastMonthLastYear"):
                                self.updateLastMonthLastYear()
                            self.updateTimeLastCall()
                            self.updateStatusLastCall(True)
                            self.myLogWarning("mise à jour effectuee")
                        except Exception as inst:
                            if (inst.args[:2] == ("call", "error")):  # gestion que c'est pas une erreur de contrat trop recent ?
                                self.myLogWarning("%s - Erreur call ERROR %s" % (self.get_PDL_ID(), inst))
                                # Erreur lors du call...
                                self.updateTimeLastCall()
                                self.updateStatusLastCall(False)
                                self.updateErrorLastCall(
                                    "%s - %s" % (messages.getMessage(inst.args[2]), self.getLastAnswer()))
                                self.myLogWarning("%s - last call : %s" % (self.get_PDL_ID(), self.getLastMethodCall()))
                            else:
                                raise Exception(inst)
                    if (self.isProduction()):
                        if (self.getStatusLastCall() or self.getLastMethodCallError() == "updateProductionYesterday"):
                            self.updateProductionYesterday()
                        self.updateTimeLastCall()
                        self.updateStatusLastCall(True)

                except Exception as inst:
                    if (inst.args == ("call", None)):
                        self.myLogWarning("*" * 60)
                        self.myLogWarning("%s - Erreur call" % (self.get_PDL_ID(),))
                        self.updateTimeLastCall()
                        self.updateStatusLastCall(False)
                        message = "%s - %s" % (messages.getMessage(inst.args[2]), self.getLastAnswer())
                        self.updateErrorLastCall(message)
                        self.myLogWarning("%s - %s" % (self.get_PDL_ID(), self.getLastMethodCall()))
                    else:
                        self.myLogWarning("-" * 60)
                        self.myLogWarning("Erreur inconnue call ERROR %s" % (inst))
                        self.myLogWarning("Erreur last answer %s" % (inst))
                        self.myLogWarning("Erreur last call %s" % (self.getLastMethodCall()))
                        self.myLogWarning("-" * 60)
                        exc_type, exc_value, exc_traceback = sys.exc_info()
                        self.myLogWarning(sys.exc_info())
                        self.updateStatusLastCall(False)
                        self.updateTimeLastCall()
                        self.updateErrorLastCall("%s" % (inst))
                        self.myLogWarning("LastMethodCall : %s" % (self.getLastMethodCall()))

            else:
                self.setUpdateRealise(False)
                self.myLog("%s pas d'update trop tot !!!" % (self.get_PDL_ID()))
        else:
            self.setUpdateRealise(False)
            self.myLog("%s update impossible contrat non trouve!!!" % (self.get_PDL_ID()))
        self.updateLastUpdate()
