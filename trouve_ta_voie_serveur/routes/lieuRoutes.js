"use strict";

const db = require("../models/dbSetup");
const Lieu = db.lieux;
const Utilisateur = db.utilisateurs;

const express = require("express");
const validatorFct = require("../fctUtils/validations");
const authMidl = require("../fctUtils/auth");

const routerLieu = express.Router();

routerLieu.use(authMidl);

routerLieu.route("/lieux/dropFormat")
          .get((req, res) => {
              Lieu.findAll({attributes: ["id", "titre"]}).then(l => {
                  res.status(200).json(l);
              }).catch(err => {
                  res.status(400).end();
              });
          })
          .all((req, res) => {
              res.status(405).end();
          });

routerLieu.route("/lieu/create")
          .post((req, res, next) => {
              const locationTitleIsValid = validatorFct.locationTitleIsValid(req.body.titre);
              const locationDescriptionIsValid = validatorFct.locationDescriptionIsValid(req.body.description);
              const locationInstructionIsValid = validatorFct.locationInstructionIsValid(req.body.directives);
              const locationGEOIsValid = validatorFct.locationGEOIsValid(req.body.latitude, req.body.longitude);

              if (locationTitleIsValid && locationDescriptionIsValid && locationInstructionIsValid && locationGEOIsValid) {
                  Utilisateur.findByPk(req.token.userId).then(u => {
                      if (u) {
                          Lieu.findOne({
                              where: {
                                  titre: req.body.titre
                              }
                          }).then(lieu => {
                              if (lieu) {
                                  res.status(400).end();
                              } else {
                                  Lieu.create({
                                      titre: req.body.titre,
                                      description: req.body.description,
                                      directives: req.body.directives,
                                      latitude: req.body.latitude,
                                      longitude: req.body.longitude,
                                      utilisateurId: req.token.userId
                                  }).then(lieu => {
                                      res.status(201).json(lieu);
                                  });
                              }
                          });
                      } else {
                          res.status(400).end();
                      }
                  }).catch(err => {
                      res.status(400).end();
                  });
              } else {
                  res.status(400).end();
              }
          })
          .all((req, res) => {
              res.status(405).end();
          });

routerLieu.route("/lieu/:id")
          .get((req, res) => {
              Lieu.findByPk(+req.params.id).then(l => {
                  res.status(200).json(l);
              }).catch(err => {
                  res.status(400).end();
              });
          })
          .put((req, res) => {
              const locationTitleIsValid = validatorFct.locationTitleIsValid(req.body.titre);
              const locationDescriptionIsValid = validatorFct.locationDescriptionIsValid(req.body.description);
              const locationInstructionIsValid = validatorFct.locationInstructionIsValid(req.body.directives);
              const locationGEOIsValid = validatorFct.locationGEOIsValid(req.body.latitude, req.body.longitude);

              if (locationTitleIsValid && locationDescriptionIsValid && locationInstructionIsValid && locationGEOIsValid) {
                  Lieu.findByPk(req.body.id).then(l => {
                      if (l) {
                          if (+req.token.userId === +l.utilisateurId) {
                              Lieu.update({
                                  titre: req.body.titre,
                                  description: req.body.description,
                                  directives: req.body.directives,
                                  longitude: req.body.longitude,
                                  latitude: req.body.latitude
                              }, {where: {id: req.body.id}});
                              res.status(204).json(req.body);
                          } else {
                              res.status(403).end();
                          }
                      } else {
                          res.status(404).end();
                      }
                  }).catch(err => {
                      res.status(400).end();
                  });
              } else {
                  res.status(400).end();
              }
          })
          .all((req, res) => {
              res.status(405).end();
          });

routerLieu.route("/lieux/:userId")
          .get((req, res) => {
              if (+req.params.userId !== +req.token.userId) return res.status(403).end(); // todo : quoi mettre si le gars veut voir ceux qui sont pas a lui?

              Utilisateur.findByPk(req.token.userId).then(u => {
                  if (u) {
                      Lieu.findAll({where: {utilisateurId: req.token.userId}})
                          .then(l => {
                              res.status(200).json(l);
                          }).catch(err => {
                          res.status(400).end();
                      });
                  } else {
                      res.status(400).end();
                  }
              }).catch(err => {
                  res.status(400).end();
              });
          })
          .all((req, res) => {
              res.status(405).end();
          });

module.exports = routerLieu;
