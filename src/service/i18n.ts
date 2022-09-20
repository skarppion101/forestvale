import { i18n } from "@lingui/core"
import en from "locales/en.json"
import fr from "locales/fr.json"
import de from "locales/de.json"
import es from "locales/es.json"
import cn from "locales/cn.json"
import ct from "locales/ct.json"

i18n.load("en", en)
i18n.load("fr", fr)
i18n.load("de", de)
i18n.load("es", es)
i18n.load("cn", cn)
i18n.load("ct", ct)
i18n.activate(localStorage.getItem("lang") || "en")
