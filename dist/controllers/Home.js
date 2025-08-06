"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _http = require('../constants/http');

function formatAverages(aggregationData) {
  return {
    averageAge: Number(parseFloat(aggregationData.averageAge || 0).toFixed(1)),
    averageWeight: Number(parseFloat(aggregationData.averageWeight || 0).toFixed(1)),
    averageHeight: Number(parseFloat(aggregationData.averageHeight || 0).toFixed(1)),
  };
}

async function getAggregatedStats() {
  const [totalStudents, totalPhotos, aggregationResult] = await Promise.all([
    _Student2.default.count(),
    _Photo2.default.count(),
    _Student2.default.findAll({
      attributes: [
        [_sequelize.fn.call(void 0, 'AVG', _sequelize.col.call(void 0, 'age')), 'averageAge'],
        [_sequelize.fn.call(void 0, 'AVG', _sequelize.col.call(void 0, 'weight')), 'averageWeight'],
        [_sequelize.fn.call(void 0, 'AVG', _sequelize.col.call(void 0, 'height')), 'averageHeight'],
      ],
      raw: true,
    }),
  ]);
  const aggregationData = aggregationResult[0] || {};

  return {
    totalStudents,
    totalPhotos,
    ...formatAverages(aggregationData),
  };
}

class Home {
  async index(_req, res) {
    try {
      const stats = await getAggregatedStats();

      return res.json(stats);
    } catch (e) {
      console.error('Erro no StatsController:', e);

      return res.status(_http.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        errors: ['Erro ao calcular estatísticas.'],
      });
    }
  }
}

exports. default = new Home();
