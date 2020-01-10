/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : nkm_admin

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 10/01/2020 16:17:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for nkm_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `nkm_dictionary`;
CREATE TABLE `nkm_dictionary` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent_id` bigint(20) unsigned NOT NULL,
  `sort` int(30) unsigned NOT NULL,
  `create_time` bigint(20) unsigned NOT NULL,
  `is_delete` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '0:未删除   1:已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nkm_dictionary
-- ----------------------------
BEGIN;
INSERT INTO `nkm_dictionary` VALUES (1, '系统管理', 'system', 'system', 0, 0, 1567835328277, 0);
INSERT INTO `nkm_dictionary` VALUES (2, '资源类型', 'system:resource', 'system:resource', 1, 0, 1567835355031, 0);
INSERT INTO `nkm_dictionary` VALUES (3, '菜单', 'system:resource:menu', 'system:resource:menu', 2, 0, 1567835373578, 0);
INSERT INTO `nkm_dictionary` VALUES (4, '页面', 'system:resource:page', 'system:resource:page', 2, 1, 1567835391101, 0);
INSERT INTO `nkm_dictionary` VALUES (5, '按钮', 'system:resource:btn', 'system:resource:btn', 2, 2, 1567835411706, 0);
INSERT INTO `nkm_dictionary` VALUES (6, '接口', 'system:resource:api', 'system:resource:api', 2, 3, 1567835428482, 0);
COMMIT;

-- ----------------------------
-- Table structure for nkm_files
-- ----------------------------
DROP TABLE IF EXISTS `nkm_files`;
CREATE TABLE `nkm_files` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `remote` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `size` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for nkm_resource
-- ----------------------------
DROP TABLE IF EXISTS `nkm_resource`;
CREATE TABLE `nkm_resource` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `parent_id` bigint(20) unsigned NOT NULL,
  `parent_code` varchar(200) NOT NULL,
  `icon` varchar(200) NOT NULL,
  `sort` int(255) unsigned NOT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enable` int(10) unsigned NOT NULL,
  `create_time` bigint(255) unsigned NOT NULL,
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nkm_resource
-- ----------------------------
BEGIN;
INSERT INTO `nkm_resource` VALUES (1, 'system', '系统管理', 'system:resource:menu', 0, '', 'el-icon-setting', 2, '/system', 1, 1566128640252, 0);
INSERT INTO `nkm_resource` VALUES (2, 'system:user', '用户管理', 'system:resource:menu', 1, '', 'x-icon-users', 1, '/system/user', 1, 1566128769341, 0);
INSERT INTO `nkm_resource` VALUES (3, 'system:resource', '资源管理', 'system:resource:menu', 1, '', 'el-icon-collection', 2, '/system/resource', 1, 1566128821691, 0);
INSERT INTO `nkm_resource` VALUES (4, 'system:role', '角色管理', 'system:resource:menu', 1, '', 'x-icon-roles', 3, '/system/role', 1, 1566128846696, 0);
INSERT INTO `nkm_resource` VALUES (5, 'dashboard', '仪表盘', 'system:resource:menu', 0, '', 'el-icon-odometer', 0, '/dashboard', 1, 1566136292367, 0);
INSERT INTO `nkm_resource` VALUES (6, 'personal:center', '个人中心', 'system:resource:menu', 0, '', 'el-icon-user', 1, '/personal-center', 1, 1566220196928, 0);
INSERT INTO `nkm_resource` VALUES (10, 'system:dictionary', '数据字典', 'system:resource:menu', 1, '', 'el-icon-notebook-1', 3, '/system/dictionary', 1, 1567432900204, 0);
INSERT INTO `nkm_resource` VALUES (11, 'system:registered', '接口-用户注册', 'system:resource:api', 2, '', '', 100, '/api/my-admin/registered', 1, 1567850087778, 0);
INSERT INTO `nkm_resource` VALUES (12, 'system:user:api:list', '接口-用户列表', 'system:resource:api', 2, '', '', 101, '/api/my-admin/system/user/list', 1, 1567850139496, 0);
INSERT INTO `nkm_resource` VALUES (13, 'system:user:api:del', '接口-用户删除', 'system:resource:api', 2, '', '', 102, '/api/my-admin/system/user/modify', 1, 1567850434289, 0);
INSERT INTO `nkm_resource` VALUES (14, 'system:user:api:allocation-role', '接口-分配角色', 'system:resource:api', 2, '', '', 103, '/api/my-admin/system/user/allocation-role', 1, 1567850496588, 0);
INSERT INTO `nkm_resource` VALUES (15, 'system:user:api:reset-password', '接口-重置密码', 'system:resource:api', 2, '', '', 104, '/api/my-admin/system/user/reset-password', 1, 1567850698979, 0);
INSERT INTO `nkm_resource` VALUES (16, 'system:user:api:update-info', '接口-修改信息', 'system:resource:api', 6, '', '', 105, '/api/my-admin/personal-center/update-info', 1, 1567850755775, 0);
INSERT INTO `nkm_resource` VALUES (17, 'system:user:api:modify-password', '接口-修改密码', 'system:resource:api', 6, '', '', 106, '/api/my-admin/personal-center/modify-password', 1, 1567850801254, 0);
INSERT INTO `nkm_resource` VALUES (18, 'system:resource:api:save', '接口-资源保存', 'system:resource:api', 3, '', '', 100, '/api/my-admin/system/resource/save', 1, 1567850844467, 0);
INSERT INTO `nkm_resource` VALUES (19, 'system:resource:api:list', '接口-资源列表树', 'system:resource:api', 3, '', '', 101, '/api/my-admin/system/resource/tree', 1, 1567850884449, 0);
INSERT INTO `nkm_resource` VALUES (20, 'system:resource:api:del', '接口-资源删除', 'system:resource:api', 3, '', '', 102, '/api/my-admin/system/resource/del', 1, 1567850924596, 0);
INSERT INTO `nkm_resource` VALUES (21, 'system:role:api:save', '接口-角色保存', 'system:resource:api', 3, '', '', 100, '/api/my-admin/system/role/save', 1, 1567850961499, 0);
INSERT INTO `nkm_resource` VALUES (22, 'system:role:api:list', '接口-角色列表', 'system:resource:api', 4, '', '', 101, '/api/my-admin/system/role/list', 1, 1567850998979, 0);
INSERT INTO `nkm_resource` VALUES (23, 'system:role:api:del', '接口-角色删除', 'system:resource:api', 4, '', '', 102, '/api/my-admin/system/role/del', 1, 1567851041307, 0);
INSERT INTO `nkm_resource` VALUES (24, 'system:dictionary:api:save', '接口-保存', 'system:resource:api', 10, '', '', 100, '/api/my-admin/system/dictionary/save', 1, 1567851096959, 0);
INSERT INTO `nkm_resource` VALUES (25, 'system:dictionary:api:list', '接口-列表', 'system:resource:api', 10, '', '', 101, '/api/my-admin/system/dictionary/tree', 1, 1567851125206, 0);
INSERT INTO `nkm_resource` VALUES (26, 'system:dictionary:api:del', '接口-删除', 'system:resource:api', 10, '', '', 102, '/api/my-admin/system/dictionary/del', 1, 1567851157874, 0);
COMMIT;

-- ----------------------------
-- Table structure for nkm_role
-- ----------------------------
DROP TABLE IF EXISTS `nkm_role`;
CREATE TABLE `nkm_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `permission` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` bigint(255) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nkm_role
-- ----------------------------
BEGIN;
INSERT INTO `nkm_role` VALUES (1, '系统管理员', 'systemAdministrator', '5,6,16,17,1,2,11,12,13,14,15,3,18,21,19,20,4,22,23,10,24,25,26', 1565586505970);
COMMIT;

-- ----------------------------
-- Table structure for nkm_users
-- ----------------------------
DROP TABLE IF EXISTS `nkm_users`;
CREATE TABLE `nkm_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `display_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_registered` bigint(255) NOT NULL DEFAULT '1565257063368',
  `last_login_time` bigint(255) NOT NULL DEFAULT '1565257063368',
  `user_status` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '0：禁用；1：启用；2：删除',
  `is_system_admin` int(10) unsigned NOT NULL DEFAULT '0',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_agent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nkm_users
-- ----------------------------
BEGIN;
INSERT INTO `nkm_users` VALUES (1, 'admin', 'a2b4b4304d93eb3895a7b1a0c3b23b88', '系统管理员', 'me@example.com', 'systemAdministrator', 1565758490904, 1578623217636, 1, 1, '/img/Fruit-2.c69b0c74.png', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
