#!/usr/bin/env python3
"""Génère les visuels (maquettes d'interface) des projets dans public/projects/.

Chaque fichier est un SVG autonome représentant une capture d'écran stylisée
de l'application, dans la même identité visuelle sombre que le portfolio.

Usage: python3 scripts/generate-project-mockups.py
"""

from pathlib import Path
from textwrap import dedent

W, H = 1600, 1000

BG = "#0a0b12"
PANEL = "#12141f"
PANEL_2 = "#171a28"
LINE = "#242838"
TEXT = "#e8eaf6"
MUTED = "#858ca6"
VIOLET = "#7c5cff"
CYAN = "#22d3ee"
AMBER = "#f6b352"
GREEN = "#34d399"
PINK = "#f472b6"
RED = "#f87171"

FONT = "font-family='ui-sans-serif, Inter, Segoe UI, sans-serif'"
MONO = "font-family='ui-monospace, SFMono-Regular, Menlo, monospace'"


def esc(text: str) -> str:
    return (
        text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    )


def rect(x, y, w, h, fill, r=0, stroke=None, opacity=None):
    s = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"'
    if stroke:
        s += f' stroke="{stroke}"'
    if opacity is not None:
        s += f' opacity="{opacity}"'
    return s + " />"


def text(x, y, content, size=16, fill=TEXT, weight=400, font=FONT, anchor="start", opacity=None):
    o = f' opacity="{opacity}"' if opacity is not None else ""
    return (
        f'<text x="{x}" y="{y}" xml:space="preserve" {font} font-size="{size}" font-weight="{weight}" '
        f'fill="{fill}" text-anchor="{anchor}"{o}>{esc(content)}</text>'
    )


def circle(cx, cy, r, fill, opacity=None):
    o = f' opacity="{opacity}"' if opacity is not None else ""
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"{o} />'


def chrome(title: str, accent: str) -> str:
    """Barre de fenêtre façon navigateur."""
    parts = [
        rect(0, 0, W, 64, PANEL, 0),
        f'<line x1="0" y1="64" x2="{W}" y2="64" stroke="{LINE}" />',
        circle(36, 32, 7, RED, 0.8),
        circle(60, 32, 7, AMBER, 0.8),
        circle(84, 32, 7, GREEN, 0.8),
        rect(120, 16, 620, 32, BG, 16, LINE),
        circle(140, 32, 4, accent),
        text(156, 38, title, 14, MUTED, font=MONO),
        rect(W - 220, 16, 88, 32, PANEL_2, 16, LINE),
        text(W - 176, 37, "Live", 13, GREEN, 500, anchor="middle"),
        circle(W - 78, 32, 16, PANEL_2),
        text(W - 78, 37, "OB", 12, MUTED, 600, anchor="middle"),
    ]
    return "\n".join(parts)


def sidebar(items, active_index, accent):
    parts = [
        rect(0, 64, 240, H - 64, PANEL, 0),
        f'<line x1="240" y1="64" x2="240" y2="{H}" stroke="{LINE}" />',
    ]
    y = 120
    for i, label in enumerate(items):
        if i == active_index:
            parts.append(rect(16, y - 24, 208, 40, f"{accent}22", 12))
            parts.append(rect(16, y - 24, 3, 40, accent, 2))
        parts.append(circle(42, y - 4, 4, accent if i == active_index else MUTED, 1 if i == active_index else 0.5))
        parts.append(text(62, y + 1, label, 14, TEXT if i == active_index else MUTED, 500 if i == active_index else 400))
        y += 52
    return "\n".join(parts)


def glow(cx, cy, r, color, opacity=0.22):
    return (
        f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#g-{color.lstrip("#")})" opacity="{opacity}" />'
    )


def defs(colors):
    grads = []
    for c in colors:
        cid = c.lstrip("#")
        grads.append(
            f'<radialGradient id="g-{cid}"><stop offset="0%" stop-color="{c}" stop-opacity="0.9"/>'
            f'<stop offset="100%" stop-color="{c}" stop-opacity="0"/></radialGradient>'
        )
    grads.append(
        f'<linearGradient id="bar" x1="0" y1="1" x2="0" y2="0">'
        f'<stop offset="0%" stop-color="{VIOLET}" stop-opacity="0.35"/>'
        f'<stop offset="100%" stop-color="{CYAN}" stop-opacity="0.95"/></linearGradient>'
    )
    grads.append(
        f'<linearGradient id="area" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0%" stop-color="{CYAN}" stop-opacity="0.35"/>'
        f'<stop offset="100%" stop-color="{CYAN}" stop-opacity="0"/></linearGradient>'
    )
    return "<defs>" + "".join(grads) + "</defs>"


def document(body: str, accents=(VIOLET, CYAN)) -> str:
    return dedent(
        f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img">
{defs(list(accents))}
{rect(0, 0, W, H, BG)}
{body}
</svg>
"""
    )


def card(x, y, w, h, title=None, accent=VIOLET):
    parts = [rect(x, y, w, h, PANEL, 18, LINE)]
    if title:
        parts.append(text(x + 24, y + 36, title, 15, TEXT, 600))
        parts.append(circle(x + w - 28, y + 30, 3, accent))
    return "\n".join(parts)


def kpi(x, y, w, label, value, delta, accent):
    return "\n".join(
        [
            rect(x, y, w, 120, PANEL, 18, LINE),
            text(x + 24, y + 40, label, 13, MUTED, 500),
            text(x + 24, y + 82, value, 30, TEXT, 700),
            rect(x + w - 96, y + 26, 72, 26, f"{accent}22", 13),
            text(x + w - 60, y + 44, delta, 12, accent, 600, anchor="middle"),
        ]
    )


def bar_chart(x, y, w, h, values, labels, accent=CYAN):
    parts = []
    n = len(values)
    gap = 18
    bw = (w - gap * (n - 1)) / n
    mx = max(values)
    for i, v in enumerate(values):
        bh = (v / mx) * (h - 40)
        bx = x + i * (bw + gap)
        by = y + (h - 40) - bh
        parts.append(f'<rect x="{bx:.1f}" y="{by:.1f}" width="{bw:.1f}" height="{bh:.1f}" rx="8" fill="url(#bar)" />')
        parts.append(text(bx + bw / 2, y + h - 8, labels[i], 12, MUTED, anchor="middle"))
    return "\n".join(parts)


def line_chart(x, y, w, h, values, accent=CYAN):
    mx, mn = max(values), min(values)
    span = max(mx - mn, 1)
    pts = []
    for i, v in enumerate(values):
        px = x + i * (w / (len(values) - 1))
        py = y + h - ((v - mn) / span) * h
        pts.append((px, py))
    d = " ".join(f"{'M' if i == 0 else 'L'}{p[0]:.1f},{p[1]:.1f}" for i, p in enumerate(pts))
    area = d + f" L{pts[-1][0]:.1f},{y + h} L{pts[0][0]:.1f},{y + h} Z"
    parts = [
        f'<path d="{area}" fill="url(#area)" />',
        f'<path d="{d}" fill="none" stroke="{accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />',
    ]
    for p in pts[::2]:
        parts.append(circle(f"{p[0]:.1f}", f"{p[1]:.1f}", 4, accent))
    return "\n".join(parts)


def code_block(x, y, lines, size=15, lh=30):
    parts = []
    for i, (ln, color) in enumerate(lines):
        parts.append(text(x - 22, y + i * lh, str(i + 1), size - 2, MUTED, font=MONO, anchor="end", opacity=0.5))
        parts.append(text(x, y + i * lh, ln, size, color, font=MONO))
    return "\n".join(parts)


def pill(x, y, label, color, w=None):
    w = w or (len(label) * 8 + 28)
    return "\n".join(
        [
            rect(x, y, w, 28, f"{color}1f", 14),
            text(x + w / 2, y + 19, label, 12, color, 600, anchor="middle"),
        ]
    )


# ---------------------------------------------------------------- projets


def ai_analyzer_editor():
    b = [
        chrome("codelens.app/analyse", VIOLET),
        sidebar(["Tableau de bord", "Analyser", "Historique", "Abonnement", "Paramètres"], 1, VIOLET),
        glow(1200, 200, 420, VIOLET, 0.16),
        # éditeur
        card(280, 96, 700, 620, "main.py — code soumis", VIOLET),
        rect(304, 140, 652, 552, BG, 12, LINE),
        code_block(
            340,
            180,
            [
                ("def moyenne(notes):", CYAN),
                ("    total = 0", TEXT),
                ("    for i in range(len(notes)):", TEXT),
                ("        total += notes[i]", TEXT),
                ("    return total / len(notes)", TEXT),
                ("", TEXT),
                ("notes = []", TEXT),
                ("print(moyenne(notes))", AMBER),
                ("", TEXT),
                ("# ZeroDivisionError si la liste", MUTED),
                ("# est vide -> corrigé ci-dessous", MUTED),
                ("", TEXT),
                ("def moyenne_v2(notes):", GREEN),
                ("    if not notes:", GREEN),
                ("        return 0", GREEN),
                ("    return sum(notes) / len(notes)", GREEN),
            ],
        ),
        rect(304, 200, 652, 30, f"{AMBER}14", 6),
        # panneau IA
        card(1010, 96, 560, 400, "Analyse de l'IA · Ollama", CYAN),
        rect(1034, 140, 512, 84, PANEL_2, 14, LINE),
        text(1058, 176, "Qualité du code", 13, MUTED, 500),
        text(1058, 206, "72 / 100", 26, TEXT, 700),
        rect(1240, 168, 280, 10, BG, 5),
        rect(1240, 168, 202, 10, CYAN, 5),
        text(1034, 262, "3 problèmes détectés", 14, TEXT, 600),
        rect(1034, 278, 512, 64, f"{RED}12", 12),
        circle(1058, 302, 5, RED),
        text(1076, 300, "Division par zéro ligne 5", 13, TEXT),
        text(1076, 324, "Ajouter une garde sur la liste vide", 12, MUTED),
        rect(1034, 352, 512, 64, f"{AMBER}12", 12),
        circle(1058, 376, 5, AMBER),
        text(1076, 374, "Boucle non pythonique ligne 3", 13, TEXT),
        text(1076, 398, "Préférer sum(notes)", 12, MUTED),
        rect(1034, 426, 512, 52, f"{GREEN}12", 12),
        circle(1058, 452, 5, GREEN),
        text(1076, 457, "Nommage des variables conforme PEP8", 13, TEXT),
        # suggestions
        card(1010, 520, 560, 196, "Suggestions générées", GREEN),
        text(1034, 596, "· Utiliser sum() au lieu d'une boucle manuelle", 13, MUTED),
        text(1034, 626, "· Gérer le cas d'une liste vide", 13, MUTED),
        text(1034, 656, "· Ajouter un test unitaire sur moyenne_v2()", 13, MUTED),
        text(1034, 686, "· Documenter la fonction (docstring)", 13, MUTED),
        # barre du bas
        card(280, 740, 1290, 200, None, VIOLET),
        text(304, 786, "Pipeline d'analyse", 15, TEXT, 600),
        pill(304, 812, "Upload du fichier", CYAN),
        pill(474, 812, "Conteneur Docker", VIOLET),
        pill(644, 812, "Modèle Ollama", VIOLET),
        pill(794, 812, "Rapport JSON", GREEN),
        pill(944, 812, "Crédit Stripe débité", AMBER),
        text(304, 890, "Temps d'analyse moyen : 6 s · 128 analyses ce mois · API REST /api/v1/analyze", 13, MUTED),
    ]
    return document("\n".join(b))


def ai_analyzer_pricing():
    plans = [
        ("Découverte", "0 MAD", ["3 analyses / mois", "Rapport résumé", "1 langage"], MUTED, False),
        ("Étudiant", "49 MAD", ["Analyses illimitées", "Rapport détaillé", "Historique complet"], VIOLET, True),
        ("Établissement", "299 MAD", ["Comptes multiples", "Suivi par classe", "Export CSV"], CYAN, False),
    ]
    b = [
        chrome("codelens.app/abonnement", VIOLET),
        glow(800, 120, 520, VIOLET, 0.18),
        glow(1300, 800, 420, CYAN, 0.12),
        text(800, 160, "Choisissez votre formule", 40, TEXT, 700, anchor="middle"),
        text(800, 200, "Paiement sécurisé par Stripe · sans engagement", 16, MUTED, anchor="middle"),
    ]
    x = 200
    for name, price, feats, color, hero in plans:
        h = 480 if hero else 430
        y = 260 if hero else 285
        b.append(rect(x, y, 400, h, PANEL, 22, color if hero else LINE))
        if hero:
            b.append(rect(x + 140, y - 16, 120, 32, color, 16))
            b.append(text(x + 200, y + 5, "POPULAIRE", 12, "#0a0b12", 700, anchor="middle"))
        b.append(text(x + 32, y + 64, name, 18, TEXT, 600))
        b.append(text(x + 32, y + 124, price, 38, color if hero else TEXT, 700))
        b.append(text(x + 32, y + 152, "par mois", 13, MUTED))
        fy = y + 210
        for f in feats:
            b.append(circle(x + 40, fy - 5, 4, color))
            b.append(text(x + 58, fy, f, 14, MUTED))
            fy += 40
        b.append(rect(x + 32, y + h - 84, 336, 52, color if hero else PANEL_2, 26, None if hero else LINE))
        b.append(text(x + 200, y + h - 51, "Payer avec Stripe" if hero else "Choisir", 15, "#0a0b12" if hero else TEXT, 600, anchor="middle"))
        x += 440
    b += [
        rect(200, 800, 1200, 120, PANEL, 18, LINE),
        text(232, 848, "Facturation", 14, MUTED, 500),
        text(232, 884, "Webhook Stripe → activation immédiate du crédit d'analyses", 15, TEXT),
        pill(1100, 846, "checkout.session.completed", GREEN, 268),
    ]
    return document("\n".join(b))


def stock_dashboard():
    b = [
        chrome("stock-manager.local/dashboard", CYAN),
        sidebar(["Tableau de bord", "Produits", "Fournisseurs", "Ventes", "Achats", "Rapports"], 0, CYAN),
        glow(1300, 160, 380, CYAN, 0.14),
        text(280, 130, "Tableau de bord", 30, TEXT, 700),
        text(280, 162, "Vue d'ensemble du stock — mise à jour il y a 2 min", 14, MUTED),
        kpi(280, 190, 300, "Références en stock", "1 248", "+3,2 %", GREEN),
        kpi(608, 190, 300, "Valeur du stock", "486 300 MAD", "+1,8 %", GREEN),
        kpi(936, 190, 300, "Ruptures", "7", "-4", AMBER),
        kpi(1264, 190, 306, "Commandes en cours", "23", "+5", CYAN),
        card(280, 342, 628, 340, "Entrées / sorties par mois", CYAN),
        bar_chart(320, 400, 548, 250, [42, 58, 35, 72, 64, 88, 76], ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"]),
        card(936, 342, 634, 340, "Valeur du stock (6 mois)", CYAN),
        line_chart(980, 420, 546, 200, [320, 368, 351, 402, 436, 421, 486]),
        card(280, 706, 1290, 234, "Alertes de réapprovisionnement", AMBER),
        text(304, 780, "Produit", 12, MUTED, 600),
        text(700, 780, "Fournisseur", 12, MUTED, 600),
        text(1050, 780, "Stock", 12, MUTED, 600),
        text(1250, 780, "Seuil", 12, MUTED, 600),
        text(1400, 780, "Statut", 12, MUTED, 600),
    ]
    rows = [
        ("Câble HDMI 2 m", "TechDis SARL", "4", "20", "Critique", RED),
        ("Clavier mécanique", "Atlas Import", "12", "25", "Faible", AMBER),
        ("Souris sans fil", "TechDis SARL", "18", "20", "Faible", AMBER),
    ]
    y = 826
    for name, sup, stock, seuil, statut, color in rows:
        b.append(rect(300, y - 24, 1250, 44, PANEL_2, 10))
        b.append(text(320, y + 4, name, 14, TEXT))
        b.append(text(700, y + 4, sup, 14, MUTED))
        b.append(text(1050, y + 4, stock, 14, TEXT, 600))
        b.append(text(1250, y + 4, seuil, 14, MUTED))
        b.append(pill(1390, y - 14, statut, color))
        y += 56
    return document("\n".join(b), accents=(CYAN, VIOLET))


def stock_products():
    b = [
        chrome("stock-manager.local/produits", CYAN),
        sidebar(["Tableau de bord", "Produits", "Fournisseurs", "Ventes", "Achats", "Rapports"], 1, CYAN),
        text(280, 130, "Produits", 30, TEXT, 700),
        rect(280, 160, 420, 44, PANEL, 22, LINE),
        circle(306, 182, 6, MUTED),
        text(324, 188, "Rechercher une référence…", 14, MUTED),
        pill(720, 168, "Catégorie : toutes", MUTED, 190),
        pill(930, 168, "En stock", GREEN, 110),
        rect(1400, 160, 170, 44, CYAN, 22),
        text(1485, 188, "+ Nouveau produit", 14, "#0a0b12", 600, anchor="middle"),
        card(280, 226, 1290, 714, None, CYAN),
        text(310, 274, "Référence", 12, MUTED, 600),
        text(470, 274, "Désignation", 12, MUTED, 600),
        text(860, 274, "Catégorie", 12, MUTED, 600),
        text(1080, 274, "Prix achat", 12, MUTED, 600),
        text(1230, 274, "Prix vente", 12, MUTED, 600),
        text(1400, 274, "Stock", 12, MUTED, 600),
        f'<line x1="300" y1="292" x2="1550" y2="292" stroke="{LINE}" />',
    ]
    rows = [
        ("REF-1042", "Écran 24\" IPS", "Informatique", "1 250", "1 690", "34", GREEN),
        ("REF-1043", "Clavier mécanique", "Périphérique", "420", "590", "12", AMBER),
        ("REF-1051", "Souris sans fil", "Périphérique", "150", "229", "18", AMBER),
        ("REF-1077", "Casque USB-C", "Audio", "310", "449", "56", GREEN),
        ("REF-1090", "Câble HDMI 2 m", "Accessoire", "45", "89", "4", RED),
        ("REF-1123", "Disque SSD 1 To", "Stockage", "780", "1 090", "27", GREEN),
        ("REF-1140", "Webcam HD", "Périphérique", "390", "549", "9", AMBER),
        ("REF-1188", "Onduleur 650 VA", "Énergie", "690", "980", "15", GREEN),
    ]
    y = 340
    for ref, name, cat, pa, pv, st, color in rows:
        b.append(rect(300, y - 26, 1250, 56, PANEL_2, 12, opacity=0.6))
        b.append(text(320, y + 6, ref, 13, MUTED, font=MONO))
        b.append(text(470, y + 6, name, 14, TEXT))
        b.append(text(860, y + 6, cat, 13, MUTED))
        b.append(text(1080, y + 6, pa + " MAD", 13, MUTED))
        b.append(text(1230, y + 6, pv + " MAD", 13, TEXT, 600))
        b.append(pill(1400, y - 10, st + " u.", color, 76))
        y += 72
    b.append(text(320, 916, "8 produits sur 1 248 · pagination", 13, MUTED))
    return document("\n".join(b), accents=(CYAN, VIOLET))


def ecommerce_shop():
    b = [
        chrome("boutique.ma", PINK),
        rect(0, 64, W, 76, PANEL, 0),
        f'<line x1="0" y1="140" x2="{W}" y2="140" stroke="{LINE}" />',
        text(48, 112, "MAISON", 22, TEXT, 700),
        text(160, 112, "· concept store", 14, MUTED),
        text(560, 110, "Nouveautés", 14, TEXT),
        text(700, 110, "Femme", 14, MUTED),
        text(800, 110, "Homme", 14, MUTED),
        text(910, 110, "Accessoires", 14, MUTED),
        rect(1180, 84, 220, 36, BG, 18, LINE),
        text(1204, 108, "Rechercher…", 13, MUTED),
        circle(1450, 102, 18, PANEL_2),
        rect(1490, 84, 70, 36, PINK, 18),
        text(1525, 107, "Panier 3", 12, "#0a0b12", 700, anchor="middle"),
        glow(300, 300, 420, PINK, 0.12),
        text(48, 220, "Sélection de la saison", 34, TEXT, 700),
        text(48, 256, "Livraison offerte dès 500 MAD · paiement sécurisé", 14, MUTED),
        pill(1200, 232, "Trier : populaires", MUTED, 190),
        pill(1400, 232, "Filtres", CYAN, 100),
    ]
    items = [
        ("Sac cabas lin", "690 MAD", GREEN, "Nouveau"),
        ("Chemise oversize", "450 MAD", None, ""),
        ("Sneakers blanches", "890 MAD", AMBER, "-20 %"),
        ("Montre acier", "1 490 MAD", None, ""),
        ("Écharpe laine", "320 MAD", GREEN, "Nouveau"),
        ("Lunettes soleil", "540 MAD", None, ""),
        ("Sac à dos cuir", "1 190 MAD", AMBER, "-15 %"),
        ("Bracelet tressé", "180 MAD", None, ""),
    ]
    x0, y0 = 48, 300
    for i, (name, price, badge_color, badge) in enumerate(items):
        cx = x0 + (i % 4) * 382
        cy = y0 + (i // 4) * 330
        b.append(rect(cx, cy, 350, 300, PANEL, 18, LINE))
        b.append(rect(cx + 16, cy + 16, 318, 180, PANEL_2, 12))
        b.append(circle(cx + 175, cy + 106, 52, PINK, 0.18))
        b.append(circle(cx + 175, cy + 106, 30, CYAN, 0.14))
        if badge:
            b.append(pill(cx + 24, cy + 24, badge, badge_color))
        b.append(text(cx + 20, cy + 232, name, 15, TEXT, 600))
        b.append(text(cx + 20, cy + 262, price, 14, PINK, 600))
        b.append(rect(cx + 232, cy + 240, 100, 34, PANEL_2, 17, LINE))
        b.append(text(cx + 282, cy + 262, "Ajouter", 12, TEXT, 600, anchor="middle"))
    return document("\n".join(b), accents=(PINK, CYAN))


def ecommerce_checkout():
    b = [
        chrome("boutique.ma/commande", PINK),
        glow(1200, 300, 420, PINK, 0.12),
        text(80, 150, "Finaliser la commande", 32, TEXT, 700),
        text(80, 186, "Étape 2 sur 3 · Livraison & paiement", 14, MUTED),
        # étapes
        circle(1180, 140, 14, GREEN),
        text(1204, 146, "Panier", 13, MUTED),
        circle(1300, 140, 14, PINK),
        text(1324, 146, "Paiement", 13, TEXT),
        circle(1430, 140, 14, PANEL_2),
        text(1454, 146, "Confirmation", 13, MUTED),
        card(80, 220, 860, 300, "Adresse de livraison", PINK),
    ]
    fields = [
        ("Nom complet", "Oumaima Boullam", 110, 290),
        ("Téléphone", "+212 6 88 21 68 08", 530, 290),
        ("Adresse", "12 rue Ibn Sina, Guéliz", 110, 380),
        ("Ville", "Marrakech", 530, 380),
    ]
    for label, value, fx, fy in fields:
        b.append(text(fx, fy, label, 12, MUTED, 500))
        b.append(rect(fx, fy + 12, 380, 48, PANEL_2, 12, LINE))
        b.append(text(fx + 18, fy + 42, value, 14, TEXT))
    b += [
        rect(110, 452, 24, 24, PINK, 6),
        text(148, 470, "Enregistrer cette adresse pour mes prochaines commandes", 13, MUTED),
        card(80, 546, 860, 300, "Paiement", CYAN),
        rect(110, 606, 380, 60, PANEL_2, 12, CYAN),
        circle(140, 636, 10, CYAN),
        text(164, 642, "Carte bancaire (Stripe)", 14, TEXT),
        rect(530, 606, 380, 60, PANEL_2, 12, LINE),
        circle(560, 636, 10, MUTED),
        text(584, 642, "Paiement à la livraison", 14, MUTED),
        text(110, 704, "Numéro de carte", 12, MUTED, 500),
        rect(110, 716, 800, 52, PANEL_2, 12, LINE),
        text(130, 748, "4242 4242 4242 4242", 15, TEXT, font=MONO),
        text(820, 748, "12 / 28   •••", 14, MUTED, font=MONO),
        text(110, 812, "Paiement chiffré · aucune donnée bancaire stockée sur le serveur", 12, MUTED),
        # récapitulatif
        card(980, 220, 540, 626, "Récapitulatif", PINK),
    ]
    lines = [("Sac cabas lin", "690 MAD"), ("Sneakers blanches", "712 MAD"), ("Écharpe laine", "320 MAD")]
    y = 300
    for name, price in lines:
        b.append(rect(1010, y - 26, 480, 64, PANEL_2, 12))
        b.append(circle(1046, y + 6, 18, PINK, 0.2))
        b.append(text(1080, y + 2, name, 14, TEXT))
        b.append(text(1080, y + 24, "Quantité 1", 12, MUTED))
        b.append(text(1466, y + 10, price, 14, TEXT, 600, anchor="end"))
        y += 84
    b += [
        f'<line x1="1010" y1="{y}" x2="1490" y2="{y}" stroke="{LINE}" />',
        text(1010, y + 40, "Sous-total", 14, MUTED),
        text(1490, y + 40, "1 722 MAD", 14, TEXT, anchor="end"),
        text(1010, y + 76, "Livraison", 14, MUTED),
        text(1490, y + 76, "Offerte", 14, GREEN, anchor="end"),
        text(1010, y + 124, "Total", 18, TEXT, 700),
        text(1490, y + 124, "1 722 MAD", 22, PINK, 700, anchor="end"),
        rect(1010, y + 156, 480, 56, PINK, 28),
        text(1250, y + 192, "Payer maintenant", 16, "#0a0b12", 700, anchor="middle"),
    ]
    return document("\n".join(b), accents=(PINK, CYAN))


def smile_detection():
    b = [
        chrome("python · smile_detect.py — OpenCV", AMBER),
        glow(500, 400, 420, AMBER, 0.12),
        card(60, 110, 900, 620, "Flux caméra · 30 fps", AMBER),
        rect(84, 154, 852, 552, "#0d0f18", 14),
        # visage stylisé
        circle(510, 420, 170, PANEL_2),
        circle(510, 420, 170, AMBER, 0.08),
        circle(455, 385, 14, TEXT, 0.85),
        circle(565, 385, 14, TEXT, 0.85),
        f'<path d="M440 470 Q510 545 580 470" fill="none" stroke="{AMBER}" stroke-width="10" stroke-linecap="round"/>',
        # boîte de détection
        f'<rect x="330" y="240" width="360" height="360" rx="8" fill="none" stroke="{GREEN}" stroke-width="3" stroke-dasharray="14 10"/>',
        rect(330, 206, 214, 32, GREEN, 8),
        text(340, 228, "sourire · 94,6 %", 14, "#0a0b12", 700),
        # coins
        text(110, 190, "REC ●", 14, RED, 700, font=MONO),
        text(110, 690, "haarcascade_frontalface + smile · seuil 0.55", 13, MUTED, font=MONO),
        # panneau droit
        card(990, 110, 550, 300, "Confiance en temps réel", GREEN),
        line_chart(1020, 190, 490, 180, [22, 31, 48, 40, 66, 74, 61, 88, 94]),
        card(990, 430, 550, 300, "Statistiques de la session", CYAN),
        text(1014, 500, "Images traitées", 13, MUTED),
        text(1516, 500, "5 412", 15, TEXT, 600, anchor="end"),
        text(1014, 546, "Visages détectés", 13, MUTED),
        text(1516, 546, "5 388", 15, TEXT, 600, anchor="end"),
        text(1014, 592, "Sourires détectés", 13, MUTED),
        text(1516, 592, "2 041", 15, GREEN, 600, anchor="end"),
        text(1014, 638, "Confiance moyenne", 13, MUTED),
        text(1516, 638, "88,3 %", 15, TEXT, 600, anchor="end"),
        text(1014, 684, "Latence par image", 13, MUTED),
        text(1516, 684, "12 ms", 15, CYAN, 600, anchor="end"),
        # console
        card(60, 754, 1480, 190, "Console", VIOLET),
        code_block(
            110,
            822,
            [
                ("$ python smile_detect.py --source 0 --threshold 0.55", GREEN),
                ("[INFO] modèle chargé · haarcascade_smile.xml", MUTED),
                ("[FRAME 5412] visage (330,240,360,360) · sourire 94.6% · 12 ms", TEXT),
            ],
            size=14,
            lh=32,
        ),
    ]
    return document("\n".join(b), accents=(AMBER, GREEN))


MOCKUPS = {
    "ai-code-analyzer-1.svg": ai_analyzer_editor,
    "ai-code-analyzer-2.svg": ai_analyzer_pricing,
    "gestion-stock-1.svg": stock_dashboard,
    "gestion-stock-2.svg": stock_products,
    "ecommerce-1.svg": ecommerce_shop,
    "ecommerce-2.svg": ecommerce_checkout,
    "smile-detection-1.svg": smile_detection,
}


def main():
    out = Path(__file__).resolve().parent.parent / "public" / "projects"
    out.mkdir(parents=True, exist_ok=True)
    for name, fn in MOCKUPS.items():
        (out / name).write_text(fn(), encoding="utf-8")
        print("écrit", out / name)


if __name__ == "__main__":
    main()
