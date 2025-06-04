const express = require('express');
const router = express.Router();
const remarkController = require('../controllers/remarkController');

router.post('/', remarkController.addRemark); // belirli revizyona ait yeni yorum eklemek için
router.get('/:revisionId', remarkController.getRemarksByRevision); //bir revizyona ait tüm yorumları listeler

module.exports = router;
